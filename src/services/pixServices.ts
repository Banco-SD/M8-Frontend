export const pixService = {
  async sendPix(key: string, amount: number): Promise<{ receiptId: string; amount: number }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({

          receiptId: "PIX-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
          amount: amount,
        });
      }, 1500);
    });
  }
};