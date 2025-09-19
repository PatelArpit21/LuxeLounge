import { jsPDF } from 'jspdf';

export const generateReceiptPDF = (booking, user) => {
  // Create new PDF document
  const doc = new jsPDF();
  
  // Set properties
  doc.setProperties({
    title: `LuxeLounge Receipt - Booking #${booking.id}`,
    subject: 'Booking Receipt',
    author: 'LuxeLounge Hotel',
    keywords: 'receipt, booking, hotel',
    creator: 'LuxeLounge Hotel System'
  });
  
  // Calculate number of nights
  const calculateNights = () => {
    const checkIn = new Date(booking.check_in);
    const checkOut = new Date(booking.check_out);
    const diffTime = Math.abs(checkOut - checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  const nights = calculateNights();
  const ratePerNight = (booking.total_amount / nights).toFixed(2);
  
  // Colors
  const primaryColor = [71, 45, 97];   // Purple
  const secondaryColor = [185, 154, 123]; // Beige
  const darkColor = [55, 65, 81];       // Dark gray
  const lightColor = [107, 114, 128];   // Light gray
  
  // Add header with color
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 40, 'F');
  
  // Hotel name
  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('LuxeLounge Hotel', 105, 20, { align: 'center' });
  
  // Address
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255, 0.8);
  doc.setFont('helvetica', 'normal');
  doc.text('123 Luxury Lane, Ahmedabad, India', 105, 28, { align: 'center' });
  doc.text('Phone: +91 1234567890 | Email: contact@luxelounge.com', 105, 33, { align: 'center' });
  
  // Receipt title
  doc.setFontSize(18);
  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.text('BOOKING RECEIPT', 105, 50, { align: 'center' });
  
  // Receipt details section
  let yPosition = 65;
  
  // Receipt number and date
  doc.setFontSize(12);
  doc.setTextColor(...darkColor);
  doc.setFont('helvetica', 'bold');
  doc.text(`Receipt Number: #${booking.id}`, 20, yPosition);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 160, yPosition, { align: 'right' });
  yPosition += 10;
  
  // Divider line
  doc.setDrawColor(...secondaryColor);
  doc.line(20, yPosition, 190, yPosition);
  yPosition += 15;
  
  // Guest information
  doc.setFontSize(14);
  doc.setTextColor(...primaryColor);
  doc.text('Guest Information', 20, yPosition);
  yPosition += 8;
  
  doc.setFontSize(11);
  doc.setTextColor(...darkColor);
  doc.text(`Name: ${user.email.split('@')[0]}`, 20, yPosition);
  doc.text(`Email: ${user.email}`, 20, yPosition + 6);
  yPosition += 20;
  
  // Booking information
  doc.setFontSize(14);
  doc.setTextColor(...primaryColor);
  doc.text('Booking Information', 20, yPosition);
  yPosition += 8;
  
  doc.setFontSize(11);
  doc.setTextColor(...darkColor);
  doc.text(`Room Type: ${booking.room_type}`, 20, yPosition);
  doc.text(`Status: ${booking.status}`, 20, yPosition + 6);
  yPosition += 20;
  
  // Stay details
  doc.setFontSize(14);
  doc.setTextColor(...primaryColor);
  doc.text('Stay Details', 20, yPosition);
  yPosition += 8;
  
  doc.setFontSize(11);
  doc.setTextColor(...darkColor);
  doc.text(`Check-in: ${booking.check_in}`, 20, yPosition);
  doc.text(`Check-out: ${booking.check_out}`, 20, yPosition + 6);
  doc.text(`Nights: ${nights}`, 20, yPosition + 12);
  doc.text(`Guests: ${booking.adults} Adult(s), ${booking.children} Child(ren)`, 20, yPosition + 18);
  yPosition += 32;
  
  // Payment details
  doc.setFontSize(14);
  doc.setTextColor(...primaryColor);
  doc.text('Payment Details', 20, yPosition);
  yPosition += 8;
  
  // Itemized bill
  doc.setFontSize(11);
  doc.setTextColor(...darkColor);
  
  // Room charges
  doc.text(`${nights} nights x $${ratePerNight}`, 20, yPosition);
  doc.text(`$${booking.total_amount}`, 190, yPosition, { align: 'right' });
  yPosition += 15;
  
  // Total
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('Total Amount:', 20, yPosition);
  doc.text(`$${Number(booking.total_amount || 0).toFixed(2)}`, 190, yPosition, { align: 'right' });
  yPosition += 20;
  
  // Booking date
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkColor);
  doc.text(`Booking Date: ${new Date(booking.created_at).toLocaleDateString()}`, 20, yPosition);
  yPosition += 15;
  
  // Thank you message
  doc.setFontSize(12);
  doc.setTextColor(...secondaryColor);
  doc.setFont('helvetica', 'italic');
  doc.text('Thank you for choosing LuxeLounge Hotel!', 105, yPosition + 10, { align: 'center' });
  
  // Footer
  doc.setFontSize(9);
  doc.setTextColor(...lightColor);
  doc.text('For any inquiries, please contact us at contact@luxelounge.com', 105, 280, { align: 'center' });
  doc.text('© 2025 LuxeLounge Hotel. All rights reserved.', 105, 285, { align: 'center' });
  
  // Save the PDF
  doc.save(`LuxeLounge-Receipt-${booking.id}.pdf`);
};