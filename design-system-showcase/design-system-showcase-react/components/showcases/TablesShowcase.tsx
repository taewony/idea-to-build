
import React from 'react';

const ShowcaseSection: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => (
  <div className="flex flex-col gap-4">
    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    <div className="mt-2 rounded-xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/20 overflow-hidden">
      {children}
    </div>
  </div>
);

const TablesShowcase: React.FC = () => {
  return (
    <div className="w-full">
      <div className="mb-12 border-b border-gray-200 dark:border-gray-700/50 pb-6">
        <h1 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-white">Tables</h1>
        <p className="mt-2 max-w-2xl text-base text-gray-500 dark:text-gray-400">
          Tables are used to organize and display data in a structured format, from simple static tables to complex data grids.
        </p>
      </div>

      <div className="space-y-12">
        <ShowcaseSection
          title="Basic Table"
          description="A simple table for displaying static data without any interactive elements."
        >
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-800/30">
              <tr>
                <th className="p-4 font-semibold text-gray-900 dark:text-white">Product</th>
                <th className="p-4 font-semibold text-gray-900 dark:text-white">SKU</th>
                <th className="p-4 font-semibold text-gray-900 dark:text-white">Price</th>
                <th className="p-4 font-semibold text-gray-900 dark:text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700/50">
                <td className="p-4">Wireless Headphones</td>
                <td className="p-4">SKU-001</td>
                <td className="p-4">$149.99</td>
                <td className="p-4"><span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/50 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-300">In Stock</span></td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700/50">
                <td className="p-4">Smartwatch</td>
                <td className="p-4">SKU-002</td>
                <td className="p-4">$299.99</td>
                <td className="p-4"><span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/50 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-300">In Stock</span></td>
              </tr>
               <tr>
                <td className="p-4">Laptop Sleeve</td>
                <td className="p-4">SKU-003</td>
                <td className="p-4">$39.99</td>
                <td className="p-4"><span className="inline-flex items-center rounded-full bg-red-100 dark:bg-red-900/50 px-2 py-1 text-xs font-medium text-red-700 dark:text-red-300">Out of Stock</span></td>
              </tr>
            </tbody>
          </table>
        </ShowcaseSection>

        <ShowcaseSection
          title="Sortable Table"
          description="A table where columns can be sorted in ascending or descending order."
        >
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-800/30">
              <tr>
                <th className="p-4 font-semibold text-gray-900 dark:text-white">
                  <a className="group inline-flex items-center gap-1 hover:text-primary" href="#">User <span className="material-symbols-outlined text-base opacity-0 group-hover:opacity-100">swap_vert</span></a>
                </th>
                <th className="p-4 font-semibold text-gray-900 dark:text-white">
                  <a className="group inline-flex items-center gap-1 text-primary" href="#">Email <span className="material-symbols-outlined text-base">arrow_downward</span></a>
                </th>
                <th className="p-4 font-semibold text-gray-900 dark:text-white">
                  <a className="group inline-flex items-center gap-1 hover:text-primary" href="#">Role <span className="material-symbols-outlined text-base opacity-0 group-hover:opacity-100">swap_vert</span></a>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700/50">
                <td className="p-4">Emily Carter</td>
                <td className="p-4">emily.carter@example.com</td>
                <td className="p-4">Admin</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700/50">
                <td className="p-4">Michael Lee</td>
                <td className="p-4">michael.lee@example.com</td>
                <td className="p-4">Editor</td>
              </tr>
              <tr>
                <td className="p-4">Sarah Chen</td>
                <td className="p-4">sarah.chen@example.com</td>
                <td className="p-4">Viewer</td>
              </tr>
            </tbody>
          </table>
        </ShowcaseSection>
        
         <ShowcaseSection
          title="Data Table with Pagination"
          description="A table for larger datasets with pagination controls to navigate through pages."
        >
          <div>
             <table className="w-full text-left text-sm">
                <thead className="border-b border-gray-200 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-800/30">
                <tr>
                    <th className="p-4 font-semibold text-gray-900 dark:text-white">Order ID</th>
                    <th className="p-4 font-semibold text-gray-900 dark:text-white">Customer</th>
                    <th className="p-4 font-semibold text-gray-900 dark:text-white">Date</th>
                    <th className="p-4 font-semibold text-gray-900 dark:text-white">Total</th>
                    <th className="p-4 font-semibold text-gray-900 dark:text-white">Status</th>
                </tr>
                </thead>
                <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700/50">
                    <td className="p-4">#12345</td>
                    <td className="p-4">John Doe</td>
                    <td className="p-4">2023-10-26</td>
                    <td className="p-4">$120.50</td>
                    <td className="p-4"><span className="inline-flex items-center rounded-full bg-yellow-100 dark:bg-yellow-900/50 px-2 py-1 text-xs font-medium text-yellow-800 dark:text-yellow-300">Pending</span></td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700/50">
                    <td className="p-4">#12346</td>
                    <td className="p-4">Jane Smith</td>
                    <td className="p-4">2023-10-25</td>
                    <td className="p-4">$89.99</td>
                    <td className="p-4"><span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/50 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">Shipped</span></td>
                </tr>
                <tr>
                    <td className="p-4">#12347</td>
                    <td className="p-4">Alice Johnson</td>
                    <td className="p-4">2023-10-24</td>
                    <td className="p-4">$250.00</td>
                    <td className="p-4"><span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/50 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-300">Delivered</span></td>
                </tr>
                </tbody>
            </table>
            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700/50 px-4 py-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">Showing 1 to 3 of 10 results</p>
                <div className="flex items-center gap-2">
                    <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800/80 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <span className="material-symbols-outlined text-base">chevron_left</span>
                    </button>
                    <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800/80 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <span className="material-symbols-outlined text-base">chevron_right</span>
                    </button>
                </div>
            </div>
          </div>
        </ShowcaseSection>
      </div>
    </div>
  );
};

export default TablesShowcase;
