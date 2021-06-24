const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        lowercase: true,
        sparse: true,
    },
    lastName: {
        type: String,
        trim: true,
        lowercase: true,
        sparse: true,
    },
    address1: {
        type: String,
        trim: true,
        lowercase: true,
        sparse: true,
    },
    address2: {
        type: String,
        trim: true,
        lowercase: true,
        sparse: true,
    },
    area: {
        type: String,
        trim: true,
        lowercase: true,
        sparse: true,
    },
    pincode: {
        type: Number,
        trim: true,
        minlength: 1,
        maxlength: 7,
    },
    city: {
        type: String,
        trim: true,
        lowercase: true,
        sparse: true,
    },
    state: {
        type: String,
        trim: true,
        lowercase: true,
    },
    country: {
        type: String,
        trim: true,
        lowercase: true,
    }
}, { _id: false })

const medicalPatientSchema = mongoose.Schema({
    crby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    addres: {
      type: mongoose.Schema.Types.ObjectId,
        ref: 'address'
    },
    uploadedDoc:{ 
      type : [{  type: String ,sparse: true }],
      default: []
    },
    patient : patientSchema,
    cancleByStorre: {
        type: [  mongoose.Schema.Types.ObjectId ],
        ref: 'users',
    },
    cancleReason: {
        type: String,
        trim: true,
    },
    status:  {
        type: String,
        index: true,
        default: 'created',
        enum: [ 'created', 'confirmByStore','cancleByStore','orderDetailed','confirmByUser','cancleByUser','startPayment','failPayment','complatePayment','dispatch','assignedToDelivery','recevied','complaint','complate' ],
        required: true
    },
    iseDelete: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
});

module.exports = medicalPatientSchema;