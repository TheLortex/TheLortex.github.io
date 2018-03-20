---
layout: page
title: About
permalink: /about/
---

As an intern at the [OCamlLab](https://ocamllabs.io/), my project is to port [MirageOS](https://mirage.io/) on the [esp32 board](https://www.espressif.com/en/products/hardware/esp32/overview). 

This will be done by two main projects:

* Set up a cross-compilation toolchain from Mirage libraries to esp32 target. It will be mainly for bytecode generation along with C stubs built with the xtensa gcc toolchain. 

* Add a new target to the OCaml compiler to have native code generation for xtensa processors.