export class ViaCepApi {
  static async getLocalByZipCode(zipCode: number): Promise<string> {
    try {
      const res = await fetch(`https://viacep.com.br/ws/${zipCode}/json`);
      const data = await res.json();
      return `${data.localidade}/${data.uf}`;
    } catch (e) {
      console.log(e);
    }
  }
}
