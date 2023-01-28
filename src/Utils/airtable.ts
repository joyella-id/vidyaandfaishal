import Airtable from "airtable";

export const apikey = "keyRwwLZXvBXBhvqN";
export const getRecords = () => {
  const base = new Airtable({ apiKey: apikey }).base("appj95J43w6kJIFyg");
  return base("rsvp")
    .select({
      view: "Grid view",
      sort: [{ field: "CreatedAt", direction: "desc" }],
    })
    .all();
};

export type CreateRecordPayload = {
  Name: string;
  Amount: number;
  Coming: boolean;
  Prayer?: string;
};

export const createRecord = (payload: CreateRecordPayload) => {
  const base = new Airtable({ apiKey: apikey }).base("appj95J43w6kJIFyg");
  return base("rsvp").create([
    {
      fields: payload,
    },
  ]);
};
