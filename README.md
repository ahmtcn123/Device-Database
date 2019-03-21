# Device-Database
Collection of development boards

## Install

```shell
$ npm i device-database
```

#### Supported devices on database

|Raspberry Pi | Orange Pi|
|--------------------|---------|
|Raspberry Pi 3      | Orange Pi PC      |
|Raspberry Pi B+     | Orange Pi PC Plus |
|Raspberry Pi 2B     | Orange Pi Plus    |
|Raspberry Pi 3B     | Orange Pi Lite    |
|Raspberry Pi 3B+    | Orange Pi Plus 2  |
|Raspberry Pi A+     | Orange Pi Plus 2E |
|Raspberry Pi 3A+    | Orange Pi One     |
|Raspberry Pi Zero   | Orange Pi 2       |
|Raspberry Pi Zero W | Orange Pi PC 2    |
|Raspberry Pi CM3+   |                   |
|Raspberry Pi CM3    |                   |

---      

### Construct module

```js
const database = require("device-database");
const data = new database.data()
```
---

#### Get parsed data

Get parsed file from /proc/cpuinfo 

```js
const data = new database.data()
console.log(data.getParsed());

/*
[ { processor: '0',
    modelName: 'ARMv7 Processor rev 4 (v7l)',
    bogomips: '76.81',
    features: 'half thumb',
    cpuImplementer: '0x41',
    cpuArchitecture: '7',
    cpuVariant: '0x0',
    cpuPart: '0xd03',
    cpuRevision: '4' },
  { hardware: 'BCM2835',
    revision: 'a02082',
    serial: 'serialid' } ]
*/

```
---

#### Get device data

Get device data

```js
const data = new database.data()
console.log(data.getDevice());

/*
  { hardware: 'BCM2835',
    revision: 'a02082',
    serial: 'serialid' }
*/

```

---
#### Get database data

Find device data exist on database

```js
const data = new database.data()
console.log(data.getResult());

/*
{ model: '3B',
  revision: '1.2',
  ram: 1024,
  manufacturer: 'Sony UK',
  brand: 'raspberry' }
*/

```
*Device results may different from others

---
#### Device exist

Check device exist on database

```js
const data = new database.data()
console.log(data.found());

/*
true || false
*/

```
