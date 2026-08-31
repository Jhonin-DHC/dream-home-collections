/** Licensed brokerage — same Central Metro Realty IABS block as ListQik. */
export const BROKER_CONTACT = {
  brandName: "Central Metro Realty",
  sponsoringBroker: "Central Metro Realty",
  sponsoringBrokerLicense: "588680",
  streetAddress: "508 N 2nd St",
  city: "Honey Grove",
  state: "TX",
  postalCode: "75446",
  phone: "737-249-9010",
  phoneTel: "+17372499010",
  email: "concierge@resolutionrealtygroup.com"
} as const;

export const DESIGNATED_BROKER = {
  name: "Jason Huval",
  license: "561230",
  email: "broker@centralmetro.com",
  phone: "737-249-9010"
} as const;

export const LICENSED_SUPERVISOR = {
  name: "Vito Raymond",
  license: "637846",
  email: "broker@centralmetro.com",
  phone: "737-249-9010"
} as const;

export function brokerFullAddressLine(): string {
  const { streetAddress, city, state, postalCode } = BROKER_CONTACT;
  return `${streetAddress}, ${city}, ${state} ${postalCode}`;
}
