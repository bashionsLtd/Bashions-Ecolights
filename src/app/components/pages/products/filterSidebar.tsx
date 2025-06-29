'use client';

const FilterSidebar = () => {
  return (
    <aside className="w-full md:w-64 p-6 space-y-6">
      <div className="border-b-2 border-gray-400 flex flex-col gap-4" >
        <h3 className="font-semibold mb-2">Categories</h3>
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="lamps" />
          <label htmlFor="in-stock">Lamps</label>
          <span className="ml-auto text-gray-500 text-xs">23</span>
        </div>
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="arts" />
          <label htmlFor="in-stock">Wall Arts</label>
          <span className="ml-auto text-gray-500 text-xs">23</span>
        </div>
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="brand" />
          <label htmlFor="in-stock">Brand Signs</label>
          <span className="ml-auto text-gray-500 text-xs">23</span>
        </div>
        <div className="flex items-center space-x-2 mt-2 mb-4">
          <input type="checkbox" id="out-stock" />
          <label htmlFor="out-stock">Kitchen Utensils</label>
          <span className="ml-auto text-gray-500 text-xs">3</span>
        </div>
      </div>

      <div className="border-b-2 border-gray-400 flex flex-col gap-4" >
        <h3 className="font-semibold mb-2">Availability</h3>
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="in-stock" />
          <label htmlFor="in-stock">In stock</label>
          <span className="ml-auto text-gray-500 text-xs">23</span>
        </div>
        <div className="flex items-center space-x-2 mt-2 mb-4">
          <input type="checkbox" id="out-stock" />
          <label htmlFor="out-stock">Out of stock</label>
          <span className="ml-auto text-gray-500 text-xs">3</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-semibold mb-2">Price</h3>
        <div className="flex gap-2 items-center mb-4">
          <input type="number" placeholder="$0" className="border w-20 px-2 py-1 text-sm" />
          <span>to</span>
          <input type="number" placeholder="$210" className="border w-20 px-2 py-1 text-sm" />
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;