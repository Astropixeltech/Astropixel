const fs = require('fs');
let file = 'prisma/schema.prisma';
let code = fs.readFileSync(file, 'utf8');

const newSchema = `
// --- Custom Email Workspace System Models ---

model Mailbox {
  id         String   @id @default(uuid())
  user_id    String   // Connects to Profile.user_id
  address    String   @unique // e.g. atik@astropixel.tech
  is_active  Boolean  @default(true)
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt

  messages   MailMessage[]
  threads    MailThread[]

  @@map("mailboxes")
}

model MailThread {
  id              String   @id @default(uuid())
  mailbox_id      String
  subject         String
  last_message_at DateTime @default(now())
  created_at      DateTime @default(now())
  updated_at      DateTime @updatedAt

  mailbox         Mailbox  @relation(fields: [mailbox_id], references: [id], onDelete: Cascade)
  messages        MailMessage[]

  @@map("mail_threads")
}

model MailMessage {
  id           String   @id @default(uuid())
  mailbox_id   String
  thread_id    String
  message_id   String   @unique // Message-ID from email headers
  in_reply_to  String?  // References parent message_id
  folder       String   @default("inbox") // inbox, sent, drafts, trash, archive
  from_name    String?
  from_address String
  to_address   String
  cc_address   String?
  bcc_address  String?
  subject      String
  body_text    String?
  body_html    String?
  is_read      Boolean  @default(false)
  is_starred   Boolean  @default(false)
  received_at  DateTime @default(now())
  created_at   DateTime @default(now())
  updated_at   DateTime @updatedAt

  mailbox      Mailbox       @relation(fields: [mailbox_id], references: [id], onDelete: Cascade)
  thread       MailThread    @relation(fields: [thread_id], references: [id], onDelete: Cascade)
  attachments  MailAttachment[]

  @@map("mail_messages")
}

model MailAttachment {
  id           String   @id @default(uuid())
  message_id   String
  filename     String
  content_type String
  size_bytes   Int
  url          String
  created_at   DateTime @default(now())

  message      MailMessage @relation(fields: [message_id], references: [id], onDelete: Cascade)

  @@map("mail_attachments")
}
`;

if (!code.includes("model Mailbox")) {
  fs.writeFileSync(file, code + newSchema);
  console.log("Appended Mail models to schema.prisma");
} else {
  console.log("Mail models already exist in schema.prisma");
}
