const Table = require("cli-table3");

var table = new Table({
  head: ["Slot No.", "Registration No."],
  colWidths: [10, 20],
});

const TYPE_CONSTANTS = {
  CREATE_LOT: "create_parking_lot",
  PARK: "park",
  LEAVE: "leave",
  STATUS: "status",
};

let parkedCar = [];
let totalParkingLots;

// CREATE PARKING LOT
const createLot = (data) => {
  const total = parseInt(data);
  totalParkingLots = total;
  return `Created parking lot with ${total} slots`;
};

// PARKING CAR
const parking = (data) => {
  let parkingStatus;

  const carNumber = data.trim();
  const emptyLot = parkedCar.indexOf(null);
  const isUnavailableLot = emptyLot > -1;

  if (totalParkingLots < 1) {
    parkingStatus = "Sorry, parking lot is full";
  } else {
    isUnavailableLot
      ? (parkedCar[emptyLot] = carNumber)
      : parkedCar.push(carNumber);

    const carIndexPosition = parkedCar.findIndex(
      (value) => value === carNumber
    );

    const actualCarIndexPosition = carIndexPosition + 1;

    totalParkingLots = totalParkingLots - 1;
    isUnavailableLot
      ? (table[(emptyLot, emptyLot)] = [actualCarIndexPosition, carNumber])
      : table.push([actualCarIndexPosition, carNumber]);
    parkingStatus = `Allocated slot number: ${actualCarIndexPosition}`;
  }

  return parkingStatus;
};

// LEAVING CAR
const leaving = (data) => {
  let leavingStatus;
  data = data.trim();

  const carNumber = () => {
    return data.slice(0, -2);
  };

  let carIndexPosition = parkedCar.findIndex((value) => value === carNumber());
  let totalCharge;

  if (carIndexPosition < 0) {
    leavingStatus = `Registration number ${carNumber()} not found`;
  } else {
    const parkedHours = data.substr(data.length - 1);
    totalCharge = (parkedHours - 2) * 10 + 10;
    parkedCar[carIndexPosition] = null;
    carIndexPosition = carIndexPosition + 1;

    table[carIndexPosition - 1] = [null, null];
    totalParkingLots = totalParkingLots + 1;
    leavingStatus = `Registration number ${carNumber()} with Slot Number ${carIndexPosition} is free with Charge ${totalCharge}`;
  }

  return leavingStatus;
};

// PRINT STATUS
const status = () => {
  return table.toString();
};

module.exports = {
  createLot,
  parking,
  leaving,
  status,
};