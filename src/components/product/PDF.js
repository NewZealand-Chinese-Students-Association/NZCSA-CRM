import { jsPDF } from 'jspdf';

const PDF = (users) => {
  console.log(users);
  let y = 10;
  const doc = new jsPDF();

  doc.setFontSize(10);

  users.forEach((element) => {
    const name = `${element.firstname} ${element.lastname}`;
    doc.text(name, 10, y);
    doc.text(element.email, 70, y);
    doc.text('Check in: ', 150, y);
    y += 5;
    doc.text('----'.repeat(80), 0, y);
    y += 10;
    if (y > 300) {
      doc.addPage();
      y = 10;
    }
  });

  //   doc.text('Hello world!', 10, 10);
  doc.save('活动报名人员.pdf');
};

export default PDF;
