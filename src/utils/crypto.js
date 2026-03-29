import CryptoJS from "crypto-js";

const SECRET_KEY = "parkeando-secret-key";

/**
 * Cifra un texto con AES y devuelve el resultado en base64
 */
export function encrypt(text) {
  try {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  } catch (error) {
    console.error("Error al cifrar:", error);
    return null;
  }
}

/**
 * Descifra un texto cifrado con AES
 */
export function decrypt(cipherText) {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted || null;
  } catch (error) {
    console.error("Error al descifrar:", error);
    return null;
  }
}
