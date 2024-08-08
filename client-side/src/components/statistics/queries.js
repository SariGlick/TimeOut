import { gql } from '@apollo/client';

export const GET_WEBSITE = gql`
  query website {
    websites {
      name
      url
    }
  }
`;
export const GET_USERS = gql`
 query users{
   users {
     name
     password
     email
    profileImage
    visitsWebsites {
      visitsTime {
        activityTime
        visitDate
      }
      websiteId {
        name
        url
      }
    }
   }
 }`

