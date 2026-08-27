/** Licensed brokerage contact — used on IABS and TREC disclosures. */
export const BROKER_CONTACT = {
  brandName: "Dream Home Collections",
  sponsoringBroker: "Dream Home Collections",
  sponsoringBrokerLicense: "",
  streetAddress: "",
  city: "",
  state: "TX",
  postalCode: "",
  phone: "(469) 727-6477",
  phoneTel: "+14697276477",
  email: "concierge@dreamhomecollections.com"
} as const;

export function brokerFullAddressLine(): string {
  const { streetAddress, city, state, postalCode } = BROKER_CONTACT;
  return [streetAddress, [city, state].filter(Boolean).join(", "), postalCode].filter(Boolean).join(" ").trim();
}
