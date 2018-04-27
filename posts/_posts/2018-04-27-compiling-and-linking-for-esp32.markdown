---
layout: post
title:  "Compiling and linking for ESP32"
date:   2018-03-29 10:13:37 +0000
categories: ocaml-native-backend esp32
excerpt: A guide to a full native compilation workflow for ESP32
comments: true
---
I've got native OCaml code running! It seems to pass all the runtime tests, and as I fixed some GC segfaults I'm now pretty confident in the backend code. 
It's not optimized at all, but you can now experiment with OCaml on ESP32 MCUs. 

## OCaml cross-compiler installation

Switch opam to OCaml version 4.06 or a 4.07 as only these two versions are supported, using the `opam switch` command.

Add my cross-compilation repository in opam, with:
```
opam repo add cross-esp32 https://github.com/TheLortex/opam-cross-esp32.git
```
After that, you'll be able to install the cross-compiler, with:
```
opam install ocaml-esp32
```

You now have an OCaml cross-compiler for esp32 installed in `~/.opam/<switch>/esp32-sysroot/`. 

## Cross-compiling OCaml libraries

Your favorite build system can already cross-compile code. You can either use
* `jbuilder build -x esp32 ...`
* `ocamlfind -toolchain esp32 ...`
* `env OCAMLFIND_TOOLCHAIN=esp32 ocamlbuild ...`
to build libraries.

The libraries used by these build systems are located in `~/.opam/<switch>/esp32-sysroot/lib/`. A good thing to know is that jbuilder automatically makes the difference between host code and target code, hence enabling the use of ppx tools. 

## Building an ESP32 application

To build an esp32 application, you'll need to link native code with the ESP-Iot Development Framework which contains libraries, bootloader code and linker scripts. 

[Hello caml](https://github.com/TheLortex/hello_caml) is an example of project structure using jbuilder that builds a flashable binary for esp32. 

Basically, it's not complicated:
* Build and ship OCaml code into a single object:
  - using the `-output-complete-obj` option on the native compiler `ocamlopt`.
  - using `jbuilder build -x esp32 _build/default.esp32/main.exe.o` that will automatically use the option.
* This object file's entry point is `caml_main`. So the next thing to do is create a `startup-c.c` file that defines a function `app_main` which calls `caml_main`. 
* Then everything needs to be linked together, and the ESP32 framework takes the lead to create the final binary. 