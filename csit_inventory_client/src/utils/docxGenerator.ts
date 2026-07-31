import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, PageBreak, ImageRun, TableOfContents, TabStopType, TabStopPosition, Table, TableRow, TableCell, BorderStyle, WidthType } from 'docx';

export interface SubTopic {
  title: string;
  content: string;
}

export interface Chapter {
  title: string;
  content: string;
  imageBuffer?: ArrayBuffer;
  subTopics?: SubTopic[];
}

export interface BoardMember {
  roleLabel: string;
  name: string;
  department?: string;
  faculty?: string;
}

export interface ReportData {
  title: string;
  subtitle?: string;
  studentName: string;
  studentId: string;
  studentRegNo: string;
  session: string;
  submissionDate: string;
  supervisorName: string;
  supervisorDesignation: string;
  supervisorDept: string;
  supervisorFaculty: string;
  abstract: string;
  acknowledgments: string;
  boardMembers: BoardMember[];
  chapters: Chapter[];
  logoBuffer?: ArrayBuffer;
}

export const generateDocx = async (data: ReportData): Promise<Blob> => {
  const sections = [];

  // Title Page
  const titlePageChildren: any[] = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 1000, after: 1000 },
      children: [
        new TextRun({
          text: data.title,
          bold: true,
          size: 32, // 16pt
        }),
      ],
    }),
  ];

  if (data.subtitle) {
    titlePageChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 1000 },
        children: [
          new TextRun({
            text: data.subtitle,
            bold: true,
            size: 28, // 14pt
          }),
        ],
      })
    );
  }

  titlePageChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 1000 },
      children: [
        new TextRun({
          text: "by",
          size: 24, // 12pt
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 1500 },
      children: [
        new TextRun({
          text: data.studentName,
          size: 24,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 1000 },
      children: [
        new TextRun({
          text: "PROJECT SUBMITTED IN PARTIAL FULLFILLMENT OF THE DEGREE OF",
          size: 24,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 2000 },
      children: [
        new TextRun({
          text: "BACHELOR OF SCIENCE IN COMPUTER SCIENCE & ENGINEERING",
          size: 24,
        }),
      ],
    })
  );

  if (data.logoBuffer) {
    titlePageChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 2000 },
        children: [
          new ImageRun({
            data: data.logoBuffer,
            transformation: {
              width: 120,
              height: 120,
            },
          }),
        ],
      })
    );
  } else {
    // Spacer if no logo
    titlePageChildren.push(new Paragraph({ spacing: { after: 2000 } }));
  }

  titlePageChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 500 },
      children: [
        new TextRun({
          text: "FACULTY OF COMPUTER SCIENCE & ENGINEERING",
          size: 24,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 2000 },
      children: [
        new TextRun({
          text: "PATUAKHALI SCIENCE & TECHNOLOGY UNIVERSITY",
          size: 24,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 500 },
      children: [
        new TextRun({
          text: data.submissionDate,
          size: 24,
        }),
      ],
    }),
    new Paragraph({
      children: [new PageBreak()],
    })
  );

  sections.push({
    properties: {},
    children: titlePageChildren,
  });

  // Declaration of Original Work (Page 2)
  sections.push({
    properties: {},
    children: [
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.LEFT,
        spacing: { after: 1000 },
        children: [new TextRun({ text: "DECLARATION OF ORIGINAL WORK", bold: true, size: 28 })],
      }),
      new Paragraph({
        spacing: { line: 360 }, // 1.5 spacing
        children: [
          new TextRun({
            text: `The project titled “${data.title}”, submitted by ${data.studentName}, Roll No. ${data.studentId}, Session: ${data.session} to the Faculty of Computer Science and Engineering, Patuakhali Science & Technology University, has been accepted as satisfactory for the fulfilment of the requirements for the degree of Bachelor of Science in Computer Science & Engineering and approved as to its style and contents.`,
            size: 24,
          }),
        ],
      }),
      new Paragraph({ children: [new PageBreak()] }),
    ],
  });

  // Board of Examinee (Page 3)
  const examineeChildren: any[] = [
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      alignment: AlignmentType.CENTER,
      spacing: { after: 1000 },
      children: [new TextRun({ text: "Board of Examinee", bold: true, size: 28 })],
    }),
  ];

  const noBorder = {
    top: { style: BorderStyle.NONE, size: 0, color: "auto" },
    bottom: { style: BorderStyle.NONE, size: 0, color: "auto" },
    left: { style: BorderStyle.NONE, size: 0, color: "auto" },
    right: { style: BorderStyle.NONE, size: 0, color: "auto" },
  };

  data.boardMembers.forEach((member) => {
    const tableRows = [
      new TableRow({
        children: [
          new TableCell({ borders: noBorder, width: { size: 40, type: WidthType.PERCENTAGE }, children: [new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "Signature", size: 24 })] })] }),
          new TableCell({ borders: noBorder, width: { size: 5, type: WidthType.PERCENTAGE }, children: [new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: ":", size: 24 })] })] }),
          new TableCell({ borders: noBorder, width: { size: 55, type: WidthType.PERCENTAGE }, children: [new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "______________________________", size: 24 })] })] }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ borders: noBorder, children: [new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: member.roleLabel, size: 24 })] })] }),
          new TableCell({ borders: noBorder, children: [new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: ":", size: 24 })] })] }),
          new TableCell({ borders: noBorder, children: [new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: member.name, size: 24 })] })] }),
        ],
      }),
    ];

    if (member.department) {
      tableRows.push(
        new TableRow({
          children: [
            new TableCell({ borders: noBorder, children: [new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "Dept. Name", size: 24 })] })] }),
            new TableCell({ borders: noBorder, children: [new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: ":", size: 24 })] })] }),
            new TableCell({ borders: noBorder, children: [new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: member.department, size: 24 })] })] }),
          ],
        })
      );
    }
    if (member.faculty) {
      tableRows.push(
        new TableRow({
          children: [
            new TableCell({ borders: noBorder, children: [new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "Faculty Name", size: 24 })] })] }),
            new TableCell({ borders: noBorder, children: [new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: ":", size: 24 })] })] }),
            new TableCell({ borders: noBorder, children: [new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: member.faculty, size: 24 })] })] }),
          ],
        })
      );
    }

    examineeChildren.push(
      new Table({
        rows: tableRows,
        width: { size: 100, type: WidthType.PERCENTAGE },
      }),
      new Paragraph({ spacing: { after: 400 } })
    );
  });

  examineeChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 1000 },
      children: [new TextRun({ text: "Patuakhali Science and Technology University, Bangladesh", size: 24 })],
    }),
    new Paragraph({ children: [new PageBreak()] })
  );

  sections.push({
    properties: {},
    children: examineeChildren,
  });

  // Certificate (Page 4)
  sections.push({
    properties: {},
    children: [
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.LEFT,
        spacing: { after: 1000 },
        children: [new TextRun({ text: "Certificate", bold: true, size: 28 })],
      }),
      new Paragraph({
        spacing: { line: 360 },
        children: [
          new TextRun({
            text: "This is to certify that this is a record of the project presented by the student whose name are given below in fulfillment of the requirements of the degree of Bachelor of Science in Computer Science and Engineering.",
            size: 24,
          }),
        ],
      }),
      new Paragraph({
        spacing: { before: 1000, after: 200 },
        children: [new TextRun({ text: data.studentName, bold: true, size: 24 })],
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: `ID: ${data.studentId}`, size: 24 })],
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: `Reg. No: ${data.studentRegNo}`, size: 24 })],
      }),
      new Paragraph({
        spacing: { after: 1500 },
        children: [new TextRun({ text: `Session: ${data.session}`, size: 24 })],
      }),
      new Paragraph({
        spacing: { after: 500 },
        children: [new TextRun({ text: "Supervised By", bold: true, size: 24 })],
      }),
      new Paragraph({
        spacing: { after: 500 },
        children: [new TextRun({ text: data.supervisorName, bold: true, size: 24 })],
      }),
      new Paragraph({
        spacing: { after: 500 },
        children: [new TextRun({ text: data.supervisorDesignation, size: 24 })],
      }),
      new Paragraph({
        spacing: { after: 500 },
        children: [new TextRun({ text: data.supervisorDept, size: 24 })],
      }),
      new Paragraph({
        spacing: { after: 500 },
        children: [new TextRun({ text: data.supervisorFaculty, size: 24 })],
      }),
      new Paragraph({
        spacing: { after: 500 },
        children: [new TextRun({ text: "Patuakhali Science & Technology University", size: 24 })],
      }),
      new Paragraph({ children: [new PageBreak()] }),
    ],
  });

  // Dedication (Page 5)
  sections.push({
    properties: {},
    children: [
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.LEFT,
        spacing: { after: 1000 },
        children: [new TextRun({ text: "DEDICATION", bold: true, size: 28 })],
      }),
      new Paragraph({
        spacing: { line: 360 },
        children: [
          new TextRun({
            text: "We dedicate this project to Allah Almighty, our Creator, our strong pillar, and our source of inspiration, wisdom, knowledge, and understanding. We also dedicate this work to our family and friends, whose support and encouragement have been invaluable throughout this journey.",
            size: 24,
          }),
        ],
      }),
      new Paragraph({ children: [new PageBreak()] }),
    ],
  });

  // Letter of Approval (Page 6)
  sections.push({
    properties: {},
    children: [
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.LEFT,
        spacing: { after: 1000 },
        children: [new TextRun({ text: "Letter of Approval", bold: true, size: 28 })],
      }),
      new Paragraph({
        spacing: { line: 360 },
        children: [
          new TextRun({
            text: `This Project Submitted by ${data.studentName} bearing ID No. ${data.studentId} in partial fulfillment of Final Project Submission for B.Sc. in CSE degree has been examined and accepted for further process.`,
            size: 24,
          }),
        ],
      }),
      new Paragraph({
        spacing: { before: 2000, after: 1500 },
        children: [new TextRun({ text: "Approved\n………………………………\n" + data.supervisorName, bold: true, size: 24 })],
      }),
      new Paragraph({ children: [new PageBreak()] }),
    ],
  });

  // Abstract (Page 7)
  sections.push({
    properties: {},
    children: [
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.LEFT,
        spacing: { after: 1000 },
        children: [new TextRun({ text: "ABSTRACT", bold: true, size: 28 })],
      }),
      new Paragraph({
        spacing: { line: 360 },
        children: [new TextRun({ text: data.abstract, size: 24 })],
      }),
      new Paragraph({ children: [new PageBreak()] }),
    ],
  });
  
  // Acknowledgments (Page 8)
  sections.push({
    properties: {},
    children: [
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.LEFT,
        spacing: { after: 1000 },
        children: [new TextRun({ text: "ACKNOWLEDGMENTS", bold: true, size: 28 })],
      }),
      new Paragraph({
        spacing: { line: 360 },
        children: [new TextRun({ text: data.acknowledgments, size: 24 })],
      }),
      new Paragraph({
        spacing: { before: 1500, after: 500 },
        children: [new TextRun({ text: "With Best Regards,", size: 24 })],
      }),
      new Paragraph({
        spacing: { before: 500 },
        children: [new TextRun({ text: data.studentName, size: 24 })],
      }),
      new Paragraph({ children: [new PageBreak()] }),
    ],
  });

  // Table of Contents
  sections.push({
    properties: {},
    children: [
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.LEFT,
        spacing: { after: 1000 },
        children: [new TextRun({ text: "Contents", bold: true, size: 28, color: "0070C0" })],
      }),
      new TableOfContents("Table of Contents", {
        hyperlink: true,
        headingStyleRange: "1-3",
      }),
      new Paragraph({ children: [new PageBreak()] }),
    ],
  });

  // Chapters
  data.chapters.forEach((chapter, index) => {
    const chapterNumber = index + 1;
    const chapterChildren: any[] = [
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { before: 1000, after: 1000 },
        children: [
          new TextRun({ text: `CHAPTER ${chapterNumber}`, bold: true, size: 32 }),
        ],
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2, // Subheading for TOC
        alignment: AlignmentType.CENTER,
        spacing: { after: 1000 },
        children: [
          new TextRun({ text: chapter.title.toUpperCase(), bold: true, size: 28 }),
        ],
      }),
    ];

    // Splitting content by newline to create paragraphs
    const paragraphs = chapter.content.split('\n').filter(p => p.trim() !== '');
    paragraphs.forEach(pText => {
      chapterChildren.push(
        new Paragraph({
          spacing: { line: 360, after: 400 },
          children: [new TextRun({ text: pText.trim(), size: 24 })],
        })
      );
    });

    // Render sub-topics
    if (chapter.subTopics && chapter.subTopics.length > 0) {
      chapter.subTopics.forEach((subTopic, subIndex) => {
        chapterChildren.push(
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 800, after: 400 },
            children: [
              new TextRun({ text: `${chapterNumber}.${subIndex + 1} ${subTopic.title}`, bold: true, size: 26 }),
            ],
          })
        );
        
        const subParagraphs = subTopic.content.split('\n').filter(p => p.trim() !== '');
        subParagraphs.forEach(pText => {
          chapterChildren.push(
            new Paragraph({
              spacing: { line: 360, after: 400 },
              children: [new TextRun({ text: pText.trim(), size: 24 })],
            })
          );
        });
      });
    }

    if (chapter.imageBuffer) {
      chapterChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 1000, after: 1000 },
          children: [
            new ImageRun({
              data: chapter.imageBuffer,
              transformation: {
                width: 500, // Roughly standard width
                height: 300,
              },
            }),
          ],
        })
      );
    }

    chapterChildren.push(new Paragraph({ children: [new PageBreak()] }));

    sections.push({
      properties: {},
      children: chapterChildren,
    });
  });

  const doc = new Document({
    features: {
      updateFields: true,
    },
    sections: sections,
  });

  return await Packer.toBlob(doc);
};
