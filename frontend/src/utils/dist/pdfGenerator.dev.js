"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateReceiptPDF = void 0;

var _jspdf = require("jspdf");

var generateReceiptPDF = function generateReceiptPDF(booking, user) {
  // Create new PDF document
  var doc = new _jspdf.jsPDF(); // Set properties

  doc.setProperties({
    title: "LuxeLounge Receipt - Booking #".concat(booking.id),
    subject: 'Booking Receipt',
    author: 'LuxeLounge Hotel',
    keywords: 'receipt, booking, hotel',
    creator: 'LuxeLounge Hotel System'
  }); // Calculate number of nights

  var calculateNights = function calculateNights() {
    var checkIn = new Date(booking.check_in);
    var checkOut = new Date(booking.check_out);
    var diffTime = Math.abs(checkOut - checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  var nights = calculateNights();
  var ratePerNight = (booking.total_amount / nights).toFixed(2); // Colors

  var primaryColor = [71, 45, 97]; // Purple

  var secondaryColor = [185, 154, 123]; // Beige

  var darkColor = [55, 65, 81]; // Dark gray

  var lightColor = [107, 114, 128]; // Light gray
  // Add header with color

  doc.setFillColor.apply(doc, primaryColor);
  doc.rect(0, 0, 210, 40, 'F'); // Hotel name

  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('LuxeLounge Hotel', 105, 20, {
    align: 'center'
  }); // Address

  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255, 0.8);
  doc.setFont('helvetica', 'normal');
  doc.text('123 Luxury Lane, Ahmedabad, India', 105, 28, {
    align: 'center'
  });
  doc.text('Phone: +91 1234567890 | Email: contact@luxelounge.com', 105, 33, {
    align: 'center'
  }); // Receipt title

  doc.setFontSize(18);
  doc.setTextColor.apply(doc, primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.text('BOOKING RECEIPT', 105, 50, {
    align: 'center'
  }); // Receipt details section

  var yPosition = 65; // Receipt number and date

  doc.setFontSize(12);
  doc.setTextColor.apply(doc, darkColor);
  doc.setFont('helvetica', 'bold');
  doc.text("Receipt Number: #".concat(booking.id), 20, yPosition);
  doc.text("Date: ".concat(new Date().toLocaleDateString()), 160, yPosition, {
    align: 'right'
  });
  yPosition += 10; // Divider line

  doc.setDrawColor.apply(doc, secondaryColor);
  doc.line(20, yPosition, 190, yPosition);
  yPosition += 15; // Guest information

  doc.setFontSize(14);
  doc.setTextColor.apply(doc, primaryColor);
  doc.text('Guest Information', 20, yPosition);
  yPosition += 8;
  doc.setFontSize(11);
  doc.setTextColor.apply(doc, darkColor);
  doc.text("Name: ".concat(user.email.split('@')[0]), 20, yPosition);
  doc.text("Email: ".concat(user.email), 20, yPosition + 6);
  yPosition += 20; // Booking information

  doc.setFontSize(14);
  doc.setTextColor.apply(doc, primaryColor);
  doc.text('Booking Information', 20, yPosition);
  yPosition += 8;
  doc.setFontSize(11);
  doc.setTextColor.apply(doc, darkColor);
  doc.text("Room Type: ".concat(booking.room_type), 20, yPosition);
  doc.text("Status: ".concat(booking.status), 20, yPosition + 6);
  yPosition += 20; // Stay details

  doc.setFontSize(14);
  doc.setTextColor.apply(doc, primaryColor);
  doc.text('Stay Details', 20, yPosition);
  yPosition += 8;
  doc.setFontSize(11);
  doc.setTextColor.apply(doc, darkColor);
  doc.text("Check-in: ".concat(booking.check_in), 20, yPosition);
  doc.text("Check-out: ".concat(booking.check_out), 20, yPosition + 6);
  doc.text("Nights: ".concat(nights), 20, yPosition + 12);
  doc.text("Guests: ".concat(booking.adults, " Adult(s), ").concat(booking.children, " Child(ren)"), 20, yPosition + 18);
  yPosition += 32; // Payment details

  doc.setFontSize(14);
  doc.setTextColor.apply(doc, primaryColor);
  doc.text('Payment Details', 20, yPosition);
  yPosition += 8; // Itemized bill

  doc.setFontSize(11);
  doc.setTextColor.apply(doc, darkColor); // Room charges

  doc.text("".concat(nights, " nights x $").concat(ratePerNight), 20, yPosition);
  doc.text("$".concat(booking.total_amount), 190, yPosition, {
    align: 'right'
  });
  yPosition += 15; // Total

  doc.setFont('helvetica', 'bold');
  doc.setTextColor.apply(doc, primaryColor);
  doc.text('Total Amount:', 20, yPosition);
  doc.text("$".concat(Number(booking.total_amount || 0).toFixed(2)), 190, yPosition, {
    align: 'right'
  });
  yPosition += 20; // Booking date

  doc.setFont('helvetica', 'normal');
  doc.setTextColor.apply(doc, darkColor);
  doc.text("Booking Date: ".concat(new Date(booking.created_at).toLocaleDateString()), 20, yPosition);
  yPosition += 15; // Thank you message

  doc.setFontSize(12);
  doc.setTextColor.apply(doc, secondaryColor);
  doc.setFont('helvetica', 'italic');
  doc.text('Thank you for choosing LuxeLounge Hotel!', 105, yPosition + 10, {
    align: 'center'
  }); // Footer

  doc.setFontSize(9);
  doc.setTextColor.apply(doc, lightColor);
  doc.text('For any inquiries, please contact us at contact@luxelounge.com', 105, 280, {
    align: 'center'
  });
  doc.text('© 2025 LuxeLounge Hotel. All rights reserved.', 105, 285, {
    align: 'center'
  }); // Save the PDF

  doc.save("LuxeLounge-Receipt-".concat(booking.id, ".pdf"));
};

exports.generateReceiptPDF = generateReceiptPDF;
//# sourceMappingURL=pdfGenerator.dev.js.map
