import Airtable from "airtable";

export const apikey = process.env.REACT_APP_AIRTABLE_API_KEY || "";
export const getRecords = () => {
  console.log(process.env);
  const base = new Airtable({ apiKey: apikey }).base(
    process.env.REACT_APP_AIRTABLE_BASE_ID || ""
  );
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
  const base = new Airtable({ apiKey: apikey }).base(
    process.env.REACT_APP_AIRTABLE_BASE_ID || ""
  );
  return base("rsvp").create([
    {
      fields: payload,
    },
  ]);
};
