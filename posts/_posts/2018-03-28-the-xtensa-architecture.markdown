---
layout: post
title:  "The Xtensa architecture"
date:   2018-03-28 10:13:37 +0000
categories: esp32
excerpt: Let's have an insight on what kind of processor ESP32 boards rely on. A lot of standard stuff but my attention will be drawn on something called "windowed registers"
---
## An architecture to rule them all

Xtensa processors instruction sets have an unified specification which can be found [here](https://0x04.net/~mwk/doc/xtensa.pdf). The goal of Tensilica is to provide a modular architecture for RISC processors which allows the designer to have a general processor with specialized instructions as options for a target application. These options can be pre-designed options such as an MMU, floating-point hardware, cache, but the designer can choose to create its own instruction with the Tensilica Instruction Extension language. Tensilica provides an Xtensa Processor Generator that outputs the processor design (in Verilog or VHDL) given an architecture choice for the processor. 

The architecture of every Xtensa processor is described in a single 662 pages long file. It is indeed a relief, coming from ARM never ending manuals for each processor implementation. I'll focus on the Xtensa LX6 that is shipped with ESP32 boards. 

## Xtensa LX6 

I found the full processor configuration in an ESP-IDF newlib include file: [newlib/include/xtensa/config/core-isa.h](https://github.com/espressif/esp-idf/blob/master/components/newlib/include/xtensa/config/core-isa.h)

### Architecture

* 32-bits
* Little-endian
* 24/16-bit instructions
* 64 general purpose registers with 16 visible registers
* Dual-core
* 240 MHz maximum frequency

### Options 

* Code density
* Zero cost loop
* 16/32-bit integer multiply
* Single precision floating-point coprocessor -- very sad as OCaml uses 64-bit floating-point
* MAC16 (multiply-accumulate functions)
* Boolean registers
* Exceptions
* Interrupts (timer and high-priority interrupts)
* Memory region protection
* Debug/JTAG

## Purpose of registers

* a0 is the return address
* a1 is the stack pointer

## Windowed registers

### Idea

That's probably one of the most special feature of the LX6, so that's what I'll talk about. The processor contains 64 32-bit registers but only an interval of 16 registers can be seen at each instant. A 4-bit WindowBase special register chooses which range of registers is visible and addressable. This register can be modified by WSR (Write to Special Register) but other instructions have special mechanisms with this feature. 

### CALL/ENTRY/RETW 

* CALLN <label>, CALLXN <register>:
  - CALL4: call a procedure that will move the window by 4 registers.
  - CALL8: same of 8 registers.
  - CALL12: you know it. 
  This does not actually move the window but rather takes the 30 first bits of the register, put them in the return address register and use the two last bits to encode the window rotation offset (4, 8 or 12).
* ENTRY sp, <frame_size>
  This instruction performs the window rotation according to the two highest bits of the return address and update the stack pointer given <frame_size>.
* RETW
  Rotates back the register window and jump to return address. Note that because the two highest bits are used to encode the window rotation, RETW uses its own two highest bits. Therefore the return address must be in the same 1G as the RETW instruction. I guess that will not be a problem for embedded devices. 

### Windowed ABI 

What happens when we're out of registers. Well the window loops over the first registers and thanks to an exception mechanism the registers are spilled under the original caller stack pointer. When the window will rotate back to this call, it the registers will be unspilled by an exception handler called by RETW. To know if a registere is used or not, another special register WindowStart has 16 bits to describe if each region of registers is used or not. 
This is described in the Xtensa ISA and I know it's confusing so I'll probably make another article on this matter. 