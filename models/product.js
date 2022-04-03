// import ShiftStatuses from "../constants/ShiftStatuses";
class Shift {
  constructor(id, ownerId, title, imageUrl,  shiftDate, shiftTime, shiftLocation, shiftStatus, bookedBy, description, price) {
    this.id = id;
    this.ownerId = ownerId;
    this.imageUrl = imageUrl;
    this.title = title;
    this.description = description;
    this.price = price;
    this.shiftDate = shiftDate;
    this.shiftTime = shiftTime;
    this.shiftLocation = shiftLocation;
    this.shiftStatus = shiftStatus;
    this.bookedBy = bookedBy;
    
  }
}

export default Shift;
