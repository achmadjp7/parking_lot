const parkingLot = require("../parkingLot");
const Table = require("cli-table3");

test("Created parking lot with 6 slots", async () => {
  const parkingSlot = parkingLot.createLot(6);
  expect(parkingSlot).toEqual("Created parking lot with 6 slots");
});

test("Allocated slot number: 1", () => {
  expect(parkingLot.parking("KA-01-HH-1234")).toEqual(
    "Allocated slot number: 1"
  );
});
test("Allocated slot number: 2", () => {
  expect(parkingLot.parking("KA-01-HH-9999")).toEqual(
    "Allocated slot number: 2"
  );
});
test("Allocated slot number: 3", () => {
  expect(parkingLot.parking("KA-01-BB-0001")).toEqual(
    "Allocated slot number: 3"
  );
});
test("Allocated slot number: 4", () => {
  expect(parkingLot.parking("KA-01-HH-7777")).toEqual(
    "Allocated slot number: 4"
  );
});
test("Allocated slot number: 5", () => {
  expect(parkingLot.parking("KA-01-HH-2701")).toEqual(
    "Allocated slot number: 5"
  );
});
test("Allocated slot number: 6", () => {
  expect(parkingLot.parking("KA-01-HH-3141")).toEqual(
    "Allocated slot number: 6"
  );
});

test("Registration number KA-01-HH-3141 with Slot Number 6 is free with Charge 30", () => {
  expect(parkingLot.leaving("KA-01-HH-3141 4")).toEqual(
    "Registration number KA-01-HH-3141 with Slot Number 6 is free with Charge 30"
  );
});

test("Slot No.    Registration No. \n        1           KA-01-HH-1234 \n        2           KA-01-HH-9999 \n        3           KA-01-BB-0001 \n        4           KA-01-HH-7777 \n        5           KA-01-HH-2701", () => {
  var table = new Table({
    head: ["Slot No.", "Registration No."],
    colWidths: [10, 20],
  });
  table.push(
    [1, "KA-01-HH-1234"],
    [2, "KA-01-HH-9999"],
    [3, "KA-01-BB-0001"],
    [4, "KA-01-HH-7777"],
    [5, "KA-01-HH-2701"],
    [null, null]
  );
  expect(parkingLot.status()).toEqual(table.toString());
});

test("Allocated slot number: 6", () => {
  expect(parkingLot.parking("KA-01-P-333")).toEqual("Allocated slot number: 6");
});
test("Sorry, parking lot is full", () => {
  expect(parkingLot.parking("DL-12-AA-9999")).toEqual(
    "Sorry, parking lot is full"
  );
});

test("Registration number KA-01-HH-1234 with Slot Number 1 is free with Charge 30", () => {
  expect(parkingLot.leaving("KA-01-HH-1234 4")).toEqual(
    "Registration number KA-01-HH-1234 with Slot Number 1 is free with Charge 30"
  );
});
test("Registration number KA-01-BB-0001 with Slot Number 3 is free with Charge 50", () => {
  expect(parkingLot.leaving("KA-01-BB-0001 6")).toEqual(
    "Registration number KA-01-BB-0001 with Slot Number 3 is free with Charge 50"
  );
});
test("Registration number DL-12-AA-9999 not found", () => {
  expect(parkingLot.leaving("DL-12-AA-9999 6")).toEqual(
    "Registration number DL-12-AA-9999 not found"
  );
});

test("Allocated slot number: 1", () => {
  expect(parkingLot.parking("KA-09-HH-0987")).toEqual(
    "Allocated slot number: 1"
  );
});
test("Allocated slot number: 3", () => {
  expect(parkingLot.parking("CA-09-IO-1111")).toEqual(
    "Allocated slot number: 3"
  );
});
test("Sorry, parking lot is full", () => {
  expect(parkingLot.parking("KA-09-HH-0123")).toEqual(
    "Sorry, parking lot is full"
  );
});

test("Slot No.    Registration No. \n        1           KA-09-HH-0987 \n        2           KA-01-HH-9999 \n        3           CA-09-IO-1111 \n        4           KA-01-HH-7777 \n        5           KA-01-HH-2701 \n        6           KA-01-P-333", () => {
  var table2 = new Table({
    head: ["Slot No.", "Registration No."],
    colWidths: [10, 20],
  });
  table2.push(
    [1, "KA-09-HH-0987"],
    [2, "KA-01-HH-9999"],
    [3, "CA-09-IO-1111"],
    [4, "KA-01-HH-7777"],
    [5, "KA-01-HH-2701"],
    [6, "KA-01-P-333"]
  );

  expect(parkingLot.status()).toEqual(table2.toString());
});