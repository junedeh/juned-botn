import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys"
import qrcode from "qrcode-terminal"

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./session")

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false // jangan pakai ini lagi
  })

  // event listener buat QR
  sock.ev.on("connection.update", ({ qr, connection }) => {
    if (qr) {
      qrcode.generate(qr, { small: true }) // QR ditampilin di terminal
    }

    if (connection === "open") {
      console.log("✅ Bot berhasil login ke WhatsApp!")
    }
  })

  sock.ev.on("creds.update", saveCreds)
}

startBot()
