"use strict";

/**
 *  profile controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

// @ts-ignore
module.exports = createCoreController("api::profile.profile", ({ Strapi }) => ({
  async createMe(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        // @ts-ignore
        return ctx.badRequest(401, [{ messages: "No athorized user found!" }]);
      }
      const result = await strapi.entityService.create("api::profile.profile", {
        data: {
          // @ts-ignore
          fullName: ctx.request.body.fullName,
          email: user.email,
          user: user.id,
        },
      });
      return result;
    } catch (err) {
      // @ts-ignore
      return ctx.badRequest(500, [{ messages: [{ id: err.message }] }]);
    }
  },
  async getMe(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        // @ts-ignore
        return ctx.badRequest(401, [{ messages: "No athorized user found!" }]);
      }
      const result = await strapi.db.query("api::profile.profile").findOne({
        where: {
          user: {
            id: {
              $eq: user.id,
            },
          },
        },
        populate: {
          image: true,
        },
      });
      return result;
    } catch (err) {
      // @ts-ignore
      return ctx.badRequest(500, [{ messages: [{ id: "Error" }] }]);
    }
  },
}));