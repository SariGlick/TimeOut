// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import TableComponent from '../../../src/stories/table/TableComponent';

// describe('TableComponent', () => {
//   const mockData1 = {
//     dataObject: {
//       headers: ['id', 'name', 'age', 'city'],
//       rows: [
//         { id: 1, name: 'יונתן', age: 25, city: 'תל אביב' },
//         { id: 2, name: 'מיכל', age: 30, city: 'ירושלים' },
//       ],
//     },
//     widthOfTable: "60%",
//     widthOfColums: [150, 150, 150, 150],
//   };

//   const mockData2 = {
//     dataObject: {
//       headers: ['id', 'name', 'profession', 'age', 'city'],
//       rows: [
//         { id: 1, name: 'יונתן', profession: 'אנגלית', age: 25, city: 'תל אביב' },
//         { id: 2, name: 'מיכל', profession: 'חשבון', age: 30, city: 'ירושלים' },
//       ],
//     },
//     widthOfTable: "80%",
//     widthOfColums: [150, 150, 150, 150, 150],
//   };

//   test('renders the table with data1 correctly', () => {
//     render(<TableComponent {...mockData1} />);

//     expect(screen.getByText('id')).toBeInTheDocument();
//     expect(screen.getByText('name')).toBeInTheDocument();
//     expect(screen.getByText('age')).toBeInTheDocument();
//     expect(screen.getByText('city')).toBeInTheDocument();
//     expect(screen.getByText('יונתן')).toBeInTheDocument();
//     expect(screen.getByText('מיכל')).toBeInTheDocument();
//   });

//   test('renders the table with data2 correctly', () => {
//     render(<TableComponent {...mockData2} />);

//     expect(screen.getByText('id')).toBeInTheDocument();
//     expect(screen.getByText('name')).toBeInTheDocument();
//     expect(screen.getByText('profession')).toBeInTheDocument();
//     expect(screen.getByText('age')).toBeInTheDocument();
//     expect(screen.getByText('city')).toBeInTheDocument();
//     expect(screen.getByText('יונתן')).toBeInTheDocument();
//     expect(screen.getByText('מיכל')).toBeInTheDocument();
//     expect(screen.getByText('אנגלית')).toBeInTheDocument();
//     expect(screen.getByText('חשבון')).toBeInTheDocument();
//   });
// });
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableComponent from '../../../src/stories/table/TableComponent';

describe('TableComponent', () => {
  const mockData1 = {
    dataObject: {
      headers: ['id', 'name', 'age', 'city'],
      rows: [
        { id: 1, name: 'יונתן', age: 25, city: 'תל אביב' },
        { id: 2, name: 'מיכל', age: 30, city: 'ירושלים' },
      ],
    },
    widthOfTable: "60%",
    widthOfColums: [150, 150, 150, 150],
  };

  const mockData2 = {
    dataObject: {
      headers: ['id', 'name', 'profession', 'age', 'city'],
      rows: [
        { id: 1, name: 'יונתן', profession: 'אנגלית', age: 25, city: 'תל אביב' },
        { id: 2, name: 'מיכל', profession: 'חשבון', age: 30, city: 'ירושלים' },
      ],
    },
    widthOfTable: "80%",
    widthOfColums: [150, 150, 150, 150, 150],
  };

  const mockDataInvalid = {
    dataObject: {
      headers: ['id', 'name', 'age'], // חסר שדה 'city'
      rows: [
        { id: 1, name: 'יונתן', age: 25 }, // חסר שדה 'city'
        { id: 2, name: 'מיכל', age: 30 }, // חסר שדה 'city'
      ],
    },
    widthOfTable: "60%",
    widthOfColums: [150, 150, 150], // מספר עמודות לא תואם
  };

  test('renders the table with data1 correctly', () => {
    render(<TableComponent {...mockData1} />);

    expect(screen.getByText('id')).toBeInTheDocument();
    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('age')).toBeInTheDocument();
    expect(screen.getByText('city')).toBeInTheDocument();
    expect(screen.getByText('יונתן')).toBeInTheDocument();
    expect(screen.getByText('מיכל')).toBeInTheDocument();
  });

  test('renders the table with data2 correctly', () => {
    render(<TableComponent {...mockData2} />);

    expect(screen.getByText('id')).toBeInTheDocument();
    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('profession')).toBeInTheDocument();
    expect(screen.getByText('age')).toBeInTheDocument();
    expect(screen.getByText('city')).toBeInTheDocument();
    expect(screen.getByText('יונתן')).toBeInTheDocument();
    expect(screen.getByText('מיכל')).toBeInTheDocument();
    expect(screen.getByText('אנגלית')).toBeInTheDocument();
    expect(screen.getByText('חשבון')).toBeInTheDocument();
  });

  test('handles invalid data without crashing', () => {
    const { container } = render(<TableComponent {...mockDataInvalid} />);

    // Verify that the component does not crash and renders without errors
    expect(screen.queryByText('id')).toBeInTheDocument();
    expect(screen.queryByText('name')).toBeInTheDocument();
    expect(screen.queryByText('age')).toBeInTheDocument();
    expect(screen.queryByText('city')).toBeNull(); // Expect 'city' not to be found

    // Verify that the data in rows is handled gracefully
    expect(screen.queryByText('יונתן')).toBeInTheDocument();
    expect(screen.queryByText('מיכל')).toBeInTheDocument();

    // Check if any table-related element is present
    // Adapt the query based on the actual table structure used in TableComponent
    expect(container.querySelector('table') || container.querySelector('div')).toBeInTheDocument();
  });
});
