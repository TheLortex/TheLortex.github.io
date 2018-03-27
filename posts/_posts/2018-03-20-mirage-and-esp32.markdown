---
layout: post
title:  "Mirage on embedded devices: where are we?"
date:   2018-03-20 12:13:37 +0000
categories: mirage ocaml-native-backend esp32
excerpt: As an intern at the OCamlLab, my project is to port MirageOS on ESP32 boards. This is my first post to explain a bit what is the subject, give some links, hints on what is to be done. 
---
## A bit of a recap 

As an intern at the [OCamlLab](https://ocamllabs.io/), my project is to port [MirageOS](https://mirage.io/) on a [ESP32 boards](https://www.espressif.com/en/products/hardware/esp32/overview). 

This will be done by two main projects:

* Set up a cross-compilation toolchain from Mirage libraries to ESP32 target. It will be mainly for bytecode generation along with C stubs built with the xtensa gcc toolchain. 

* Add a new target to the OCaml compiler to have native code generation for xtensa processors.

### What is ESP32 

ESP32 is a series of chip microcontrollers which embeds Wifi and Bluetooth controllers. It integrates the following hardware:
* Dual core Xtensa LX6 processors - 240Mhz
* Ultra-low power coprocessor
* 520kb of RAM
* 4Mb of read-only flash
* Wifi b/g/n transceiver
* Bluetooth 4.2 Low Energy
* Multiple peripheral interfaces
* 5μA deep-sleep current

The base price of such a chip is $5, which makes it fairly cheap. Here are some derivations of the ESP32:
* [Base chip + USB](https://wiki.wemos.cc/products:lolin32:lolin32_lite) ($5)
* [Base chip + USB + Battery powered](https://www.sparkfun.com/products/13907) ($20)
* [Base chip + 4Mb PSRAM](http://www.electrodragon.com/product/esp32-wrover-v4-module-based-esp32/) ($4.40) 
* [Base chip + USB  + 4Mb PSRAM + LCD screen + JTAG over USB + SD card support](http://www.electrodragon.com/product/esp32-wrover-kit/) ($37.10)

Hence this chip is very interesting for IoT projects, as it is versatile, low-power, and connected. 

#### Programming on ESP32

Espressif published a development guide and toolchain for C programming. You can find it as the [ESP-IDF](http://esp-idf.readthedocs.io/en/latest/) (IoT Development Framework) and there are all the resources needed to develop on this board. It contains a lot of documented libraries that help exploiting the features of ESP32 chips. It's fairly easy to compile a simple program as the framework will automatically compile and link the code with ESP libraries and newlib, creating a flashable binary. 

This chip can also programmed trough:
* [MicroPython](http://micropython.org/download#esp32) (Python for microcontrollers) features a Python toplevel on serial over USB. MicroPython libraries includes for example an easy way to connect to a Wifi hotspot and communicate with the world. 
* [Arduino](https://github.com/espressif/arduino-esp32)

### What is Mirage ? 

"MirageOS is a library operating system that constructs unikernels for secure, high-performance network applications across a variety of cloud computing and mobile platforms". Written in OCaml, Mirage relies on opam package manager to download and build libraries. 

* The `mirage` package contains the OCaml tool which will build an unikernel from sources to a specific target. `mirage configure -t xen` would for example create the list of packages needed to compile an unikernel for a Xen hypervisor. 

* The mirage library is composed of a lot of features libraries, sometimes target-specific, whose types implement one of the `mirage-types`. These types defines interfaces for:
  - Block devices
  - Channels
  - Time 
  - Console 
  - Filesystem
  - Network
  - ...

### Why Mirage should be ported to the ESP32 

Mirage is a library that allows the user to build applications without relying on a particular operating system, compiling it with minimal amount of libraries needed to run the application on bare metal or on top of an hypervisor. Thus a MirageOS unikernel can rely on operating system features such as network or devices without shipping millions of useless lines of code a typical OS can have. 

This improves security, performances and reduces the memory footprint of an application. That's why having Mirage unikernels running on ESP32 boards is a great goal. 

## Where are we now ?

We want to be able to ship OCaml code on ESP32 boards. However, Xtensa processors use a [specific](https://0x04.net/~mwk/doc/xtensa.pdf) instruction set. This instruction set is currently not supported by the OCaml compiler, the only compiler toolchain building for ESP32 being the [xtensa-esp32-elf](https://dl.espressif.com/dl/xtensa-esp32-elf-linux64-1.22.0-61-gab8375a-5.2.0.tar.gz) toolchain whose code hasn't been distributed. 

### Bytecode execution on the ESP32

Hopefully, OCaml runtimes are written in C and can be built with the cross toolchain. With some efforts tweaking constants and Newlib compilation settings, Sadiq successfully compiled an OCaml code into bytecode which could be executed on an ESP32 board: [Getting OCaml running on the ESP32](https://toao.com/blog/getting-ocaml-running-on-the-esp32). This is promising as it means we could build, link and run any OCaml library on an ESP32 target.

However two problems were encountered:
* OCaml's `Printf.printf` doesn't work out of the box. I figured out that ESP-IDF's VFS is a bit broken and doesn't correctly implement file descriptors behavior. I'll write on article on that matter. 

* Using several libraries such as `Map` and `Pervasives`, the size of the generated bytecode becomes too big for the 520kb RAM to hold. No problem! Let's put it in flash, I just have to change a `static` to a `static const` in the C file containing the bytecode. Well it doesn't work out of the box as the bytecode runtime actually perform an update pass over the bytecode to prepare it for threaded mode, therefore if the bytecode is set in flash memory it can't be updated and an exception is raised. That pass had to be disabled in order to fix the issue. After that I could build more complex programs, generate their bytecode and run it on an ESP32 board. 

### Cross-compilation of mirage libraries

#### Mirage ESP32 target

The first step towards compiling an unikernel with Mirage is to add a new target on the mirage configuration tool. Adding an esp32 target allows `mirage configure -t esp32` to generate an unikernel package which will depend on ESP32 libraries implementations. 

#### opam-cross-esp32 libraries

Mirage libraries required to build an unikernel come in a great number. Opam handles everything in case of host compilation, but there isn't yet any way to cross-compile a package with its dependencies out of the box. 

As I looked online I figured out the best way to cross-compile stuff on OCaml is to do as `whitequark` did with `opam-cross-android`. The idea is to create for every package <*name*>, a clone package <*name-esp32*> which is cross-compiled with an `ocaml-esp32` cross-toolchain and installed within a specific prefix. 

This is tedious work, and it can hardly be automated as there are a lot of patterns and use of different build systems. Generation of bytecode libraries along with C libraries is not such a problem, but it's a bit ugly as some of these libraries rely on preprocessing libraries and tools that need to be built with a host toolchain. 
For example a build that rely on an ocamlbuild plugin need to have the plugin built with the host toolchain, before switching to the target toolchain in order to build the library. 

Right now every dependency of the noop mirage sample has its `-esp32` version in [opam-cross-esp32](https://www.github.com/TheLortex/opam-cross-esp32). However it has been done in a funky/hacky way and it doesn't build out of the box. 

### Native xtensa backend for the OCaml compiler

To reduce memory footprint and speed up execution, the end goal is to have a native backend of the OCaml compiler for ESP32 targets. This implies digging in the compiler source code as the documentation is fairly.. [empty](https://github.com/ocamllabs/ocaml-internals/wiki). The work consists in writing the last layer of compilation which generates assembly code from the last intermediary language of OCaml compilation. It's not that hard as I can read the source of several other backends for common architectures (ARM, i386, ..) and translate from there using the Xtensa Instruction Set Architecture.