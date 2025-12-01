
import { agencyClients } from '../data/agency-data';

describe('Agency Data', () => {
  it('should have clients defined', () => {
    expect(agencyClients.length).toBeGreaterThan(0);
  });

  it('should have marketing campaigns for the first client', () => {
    const client = agencyClients[0];
    expect(client.campaigns.length).toBeGreaterThan(0);
    expect(client.campaigns[0]).toHaveProperty('spend');
    expect(client.campaigns[0]).toHaveProperty('revenue');
  });

  it('should have valid ROAS calculation possible', () => {
    const client = agencyClients[0];
    const totalSpend = client.campaigns.reduce((sum, c) => sum + c.spend, 0);
    const totalRevenue = client.campaigns.reduce((sum, c) => sum + c.revenue, 0);
    expect(totalSpend).toBeGreaterThan(0);

    // Check if ROAS is a number
    const roas = totalRevenue / totalSpend;
    expect(roas).not.toBeNaN();
  });
});
