import mongoose from 'mongoose';
import Users from '../models/user.model.js';
import Websites from '../models/websites.model.js'
import visitedWebSite from '../models/visitedWebSite.model.js';
import { getVisitedWebsiteById } from '../controllers/visitedWebSite.controller.js'
import { getWebsiteById } from '../controllers/websites.controller.js'

async function visitedWebsiteservice(data) {
  const { userId, type, customDates } = data;
  const now = new Date();
  let startDate, endDate, div;

  switch (type) {
    case 'day':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      div = 1;
      break;
    case 'month':
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      div = 30;
      break;
    case 'year':
      startDate = new Date(now.getFullYear() - 1, now.getMonth() - 1, now.getDate());
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      div = 365;
      break;
    case 'custom':
      startDate = new Date(customDates[0]);
      endDate = new Date(customDates[1]);
      const diffInMilliseconds = endDate - startDate;
      div = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
      break;
    default:
      throw new Error('Invalid choice');
  }

  const user = await Users.findById(userId);

  endDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate() + 1);

  const results = [];
  let i = 0;

  for (const websiteId of user.visitsWebsites) {

    try {
      const websiteData = await getVisitedWebsiteById(websiteId);

      if (websiteData && websiteData.visitsTime) {
        const totalActivityTime = websiteData.visitsTime.reduce((total, visit) => {
          if (visit.visitDate >= startDate && visit.visitDate <= endDate) {
            return total + visit.activityTime;
          }
          return total;
        }, 0);
        let avg = totalActivityTime / div || 0;
        const result = {
          id: i,
          website_name: websiteData && websiteData.websiteId && websiteData.websiteId.name || "error",
          total_time: totalActivityTime,
          avg_for_day: avg.toFixed(2)
        };
        if (totalActivityTime > 0) {
          results.push(result);
          i++;
        }

      } else {
        console.log(`Website with ID ${websiteId} has no visitsTime data.`);
      }
    } catch (error) {
      console.error(`Error fetching website data for ID ${websiteId}:`, error);
    }
  }
  
  return results;
}


export default visitedWebsiteservice;





