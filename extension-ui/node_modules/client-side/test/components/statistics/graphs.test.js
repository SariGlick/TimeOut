import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import { Provider } from 'react-redux';
import VisitedWebsitesComponent from '../../../src/components/statistics/graphs.jsx';
import { GET_USERS, GET_WEBSITE } from '../../../src/components/statistics/queries.js';
import { store } from '../../../src/redux/store.jsx';

describe('VisitedWebsitesComponent', () => {
    const mocks = [
        {
            request: {
                query: GET_USERS,
            },
            result: {
                data: {
                    users: [
                        {
                            "_id": "669535fa91606a13857abd0b",
                            "name": "jack",
                            "email": "jack@gmail.com",
                            "password": "fdfdfd",
                            "googleId": "fdfdffdfd",
                            "profileImage": "rimon.jpg",
                            "visitsWebsites": [
                                {
                                    "_id": "6694ed068b0ebdbe10fbb8d3",
                                    "visitsTime": [
                                        {
                                            "visitDate": "2024-06-15T15:56:20.000Z",
                                            "activityTime": 150,
                                            "_id": "669d07ea77f0de67ad26038a"
                                        }
                                    ],
                                    "__v": 0,
                                    "websiteId": {
                                        "_id": "669d07ea77f0de67ad26038a",
                                        "name": "google",
                                        "url": "https:/google.com",
                                        "__v": 0
                                    }
                                }
                            ],
                            "profiles": [],
                            "preferences": [
                                "6694e4cf0d8e4ee0aab3d15d"
                            ]
                        }
                    ],
                },
            },
        },
        {
            request: {
                query: GET_WEBSITE,
            },
            result: {
                data: {
                    websites: [
                        [
                            {
                                "_id": "669cdf6dd4542df95fcee586",
                                "name": "Gmail",
                                "url": "https:/Gmail.com"
                            },
                            {
                                "_id": "669d079b77f0de67ad260386",
                                "name": "netfree",
                                "url": "https:/netfree.com"
                            },
                            {
                                "_id": "669d07c177f0de67ad260388",
                                "name": "github",
                                "url": "https:/github.com"
                            },
                            {
                                "_id": "669d07ea77f0de67ad26038a",
                                "name": "google",
                                "url": "https:/google.com"
                            }
                        ]
                    ],
                },
            },
        },
    ];

    const startDate = "2024-06-01";
    const endDate = "2024-06-29";


    it('renders loading indicator when data is loading', async () => {

        const { getByRole } = render(
            <Provider store={store}>
                <MockedProvider mocks={mocks}>
                    <VisitedWebsitesComponent startDate={startDate} endDate={endDate} />
                </MockedProvider>
            </Provider>
        );
        expect(getByRole('progressbar')).not.toBeNull();
    });

    it('renders pie chart with data when data is available', async () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <MockedProvider mocks={mocks}>
                    <VisitedWebsitesComponent startDate={startDate} endDate={endDate} />
                </MockedProvider>
            </Provider>
        );
        const pieChart = await waitFor(() => getByTestId('pie-chart'));
        expect(pieChart).toBeInTheDocument();
        expect(pieChart.querySelector('svg').getAttribute('class')).toContain('MuiChartsSurface-root');
    });

    it('renders error message when data is not available', async () => {
        const { container } = render(<Provider store={store}>
            <MockedProvider mocks={mocks}>
                <VisitedWebsitesComponent startDate={startDate} endDate={endDate} />
            </MockedProvider>
        </Provider>);

        await waitFor(() => container.querySelector('.error-message'));
    });
});