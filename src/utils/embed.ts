import { EmbedBuilder, StringSelectMenuBuilder } from "discord.js";
import DutyHandler from '../utils/duty';
import { stringify } from "querystring";
// apply thin wrapper on EmbedBuilder for modularity
export function EmbedBuilderWrapper(listings : any) {


  // type Listing = {
  //   creator: string
  //   datacenter: string
  //   description: string
  //   duty: string
  //   expires: string
  //   updated: string
  //   world: string
  //   tags: string

  // }

  // type temp = {
  //   name: string
  //   value: string
  //   inline: boolean
  // }

  let fields = []
  for (const listing in listings) {
    console.log(listing[0])
  }
  const embed = {
    title: listings[0].duty,

    footer: {
      text: `${listings[0].datacenter} Data Center`
    }
  };
    // .addFields(
    //   { name: listings[0].creator, value: 'Some value here', inline: true },
    //   { name: listings[0].tags, value: listings[0].description, inline: true },
    //   { name: listings[0].expires, value: listings[0].updated, inline: true },
    // )
    return embed;
}
