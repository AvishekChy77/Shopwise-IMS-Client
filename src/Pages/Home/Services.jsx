import { FaShippingFast } from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";
import { GoGraph } from "react-icons/go";
import { PiWarehouse } from "react-icons/pi";
import { SiBookstack } from "react-icons/si";
import { SlLocationPin } from "react-icons/sl";

const Services = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-10">
      <div className="font-YSerif text-center space-y-4">
        <h2 className="text-3xl text-black md:text-4xl xl:text-5xl">
          The one-stop platform you need to thrive
        </h2>
        <p className=" text-slate-950 text-lg xl:text-xl">
          Everything you need to succeed in one intuitive cloud system.
        </p>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className=" flex flex-col items-start max-w-xs group cursor-default">
          <GoGraph className=" group-hover:text-teal-500" size={40} />
          <h2 className=" text-lg font-bold mb-1">Increase sales</h2>
          <p className=" grow text-justify">
            Expand your business online with our multi-channel inventory
            management system. Set up and integrate your Amazon, eBay, Etsy, or
            Shopify account, and start selling your merchandise.
          </p>
        </div>
        <div className=" flex flex-col items-start max-w-xs group cursor-default">
          <SiBookstack className=" group-hover:text-teal-500" size={40} />
          <h2 className=" text-lg font-bold mb-1">Manage orders</h2>
          <p className=" grow text-justify">
            Manage your offline and online orders with our efficient order
            management system. Also, you can create purchase orders, backorders
            and drop shipments, all in a single inventory management
            application.
          </p>
        </div>
        <div className=" flex flex-col items-start max-w-xs group cursor-default">
          <FaShippingFast className=" group-hover:text-teal-500" size={40} />
          <h2 className=" text-lg font-bold mb-1">
            Multiple shipping integrations
          </h2>
          <p className=" grow text-justify">
            Get real-time shipping rates and in-transit details of major
            shipping carriers and choose a shipping partner for your business,
            wisely. A much-needed feature for a complete inventory management
            system.
          </p>
        </div>
        <div className=" flex flex-col items-start max-w-xs group cursor-default">
          <SlLocationPin className=" group-hover:text-teal-500" size={40} />
          <h2 className=" text-lg font-bold mb-1">End-to-end tracking</h2>
          <p className=" grow text-justify">
            Track every item or batch in your inventory with serial number and
            batch tracking feature. This way, you can either always keep a track
            on the movement of the items or have better control over the expiry
            of each batch.
          </p>
        </div>
        <div className=" flex flex-col items-start max-w-xs group cursor-default">
          <GiGearStickPattern
            className=" group-hover:text-teal-500"
            size={40}
          />
          <h2 className=" text-lg font-bold mb-1">
            Accounting and CRM integrations
          </h2>
          <p className=" grow text-justify">
            Our seamless integration with Zoho CRM and Zoho Books automatically
            syncs all your contacts, orders and help you manage financial data
            without breaking a sweat.
          </p>
        </div>
        <div className=" flex flex-col items-start max-w-xs group cursor-default">
          <PiWarehouse className=" group-hover:text-teal-500" size={40} />
          <h2 className=" text-lg font-bold mb-1">Warehouse Management</h2>
          <p className=" grow text-justify">
            Check stock level, manage inter-warehouse transfer, and generate
            reports for specific warehouses within seconds. Warehouse inventory
            management, at your fingertips.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
