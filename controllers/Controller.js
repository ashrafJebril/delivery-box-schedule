class Controller {
  constructor(model, name, messageKey) {
    this.Model = model;
    this.name = name;
    this.key = messageKey;
  }

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
  async create(data) {
    try {
      const item = await this.Model.create(data);
      return { status: 201, data: item };
    } catch (error) {
      return {
        status: 500,
        error: this.key.create ? this.key.create.fail : error.message,
      };
    }
  }

  async getAll(size = 10, page = 1) {
    try {
      const items = await this.Model.findAndCountAll({
        limit: size,
        offset: (page - 1) * size,
        // where: { active },
        order: [["id", "DESC"]],
      });
      return { status: 200, data: items };
    } catch (error) {
      return {
        status: 500,
        error: this.key.update ? this.key.update.fail : error.message,
      };
    }
  }

  async getById(zoneId) {
    try {
      const item = await this.Model.findOne({ where: { id: zoneId } });
      return { status: 200, data: item };
    } catch (error) {
      return {
        status: 500,
        error: this.key.getById ? this.key.getById.fail : error.message,
      };
    }
  }

  async update(id, data) {
    try {
      const isExist = await this.Model.findOne({ where: { id: id } });
      if (!isExist) {
        return {
          status: 404,
          error: this.key.update
            ? this.key.update.fail
            : this.name + " Doesn't exist",
        };
      }
      const updated = await this.Model.update(data, { where: { id: id } });
      if (updated) {
        return {
          status: 200,
          message: this.key.update
            ? this.key.update.success
            : this.name + " Updated Successfully",
        };
      }
    } catch (error) {
      return {
        status: 500,
        error: this.key.update ? this.key.update.fail : error.message,
      };
    }
  }

  async activate(id) {
    try {
      const isExist = await this.Model.findOne({ where: { id: id } });
      if (!isExist) {
        return {
          status: 404,
          error: this.key.delete
            ? this.key.delete.fail
            : this.name + " Doesn't exist",
        };
      }
      const updated = await this.Model.update(
        { active: true },
        { where: { id: id } }
      );
      if (updated) {
        return {
          status: 200,
          message: this.key.delete
            ? this.key.delete.success
            : this.name + " Activated Successfully",
        };
      }
    } catch (error) {
      return {
        status: 500,
        error: this.key.delete ? this.key.delete.fail : error.message,
      };
    }
  }

  async deactivate(id) {
    try {
      const isExist = await this.Model.findOne({ where: { id: id } });
      if (!isExist) {
        return {
          status: 404,
          error: this.key.delete
            ? this.key.delete.fail
            : this.name + " Doesn't exist",
        };
      }
      const updated = await this.Model.update(
        { active: false },
        { where: { id: id } }
      );
      if (updated) {
        return {
          status: 200,
          message: this.key.delete
            ? this.key.delete.success
            : this.name + " Deactivated Successfully",
        };
      }
    } catch (error) {
      return {
        status: 500,
        error: this.key.delete ? this.key.delete.fail : error.message,
      };
    }
  }
}

module.exports = Controller;
