import React from 'react';

interface TableProps<T> {
  data: T[];
  headers: { key: keyof T; label: string }[];
}

const Table = <T,>({ data, headers }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="border-b bg-gray-200">
            {headers.map((header) => (
              <th key={header.key as string} className="p-4 text-left">
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              {headers.map((header) => (
                <td key={header.key as string} className="p-4">
                  {String(item[header.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;