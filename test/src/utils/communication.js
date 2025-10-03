export const sendWhatsAppMessage = (phoneNumber, message) => {
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
};

export const sendEmail = (emailAddress, subject, body) => {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  window.open(`mailto:${emailAddress}?subject=${encodedSubject}&body=${encodedBody}`, '_blank');
};
