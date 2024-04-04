const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ["AUS", "DFW", "DEN", "ATL", "GIG", "SSA", "LAX", "SAN"],
    },
    arrival: {
        type: Date        
    }
},{
    timestamps: true
  });



const flightSchema = new Schema({
    airline: {
        type: String, 
        // required: true,
        enum: ["American", "Southwest", "United"]
    },
    airport: {
        type: String,
        // required: true,
        enum: ["AUS", "DFW", "DEN","ATL", "GIG", "SSA", "LAX", "SAN"],
        default: "ATL",
    },
    flightNo: {
        type: Number,
        // required: true,
        min:10,
        max:9999,
        },
    departs: {
        type: Date, 
        // required: true,
        default: function() {
            var currentDate = new Date(); // Get the current date and time
            currentDate.setFullYear(currentDate.getFullYear() + 1); // Add 1 to the current year
            return currentDate; // Return the new date, one year in the future
          }          
    },
    destinations: [destinationSchema]
},{
    timestamps: true
  });

module.exports = mongoose.model('Flight', flightSchema);
