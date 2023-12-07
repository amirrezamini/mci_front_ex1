import HttpFactory from "~/repository/factory";

class UserModule extends HttpFactory {
  private RESOURCE = "/users";

  async getUsers(): Promise<any> {
    return await this.call<any>("GET", `${this.RESOURCE}/`);
  }
}

export default UserModule;
