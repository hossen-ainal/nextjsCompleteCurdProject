// import Invoice from './models/Invoice';  // your Invoice mongoose model
// import Customer from './models/Customer'; // your Customer mongoose model

const ITEMS_PER_PAGE = 10; // or your actual value

export async function fetchFilteredInvoices(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    // Create a case-insensitive regex for the query
    const regexQuery = new RegExp(query, 'i');

    // First, find customers that match the query in name or email
    const matchingCustomers = await Customer.find({
      $or: [{ name: regexQuery }, { email: regexQuery }],
    }).select('_id');

    // Extract customer IDs matching the query
    const customerIds = matchingCustomers.map(c => c._id);

    // Find invoices matching query on amount, date, status OR customer_id in matchingCustomers
    const invoices = await Invoice.find({
      $or: [
        { customer_id: { $in: customerIds } },
        { amount: { $regex: regexQuery } },
        { date: { $regex: regexQuery } },
        { status: regexQuery },
      ],
    })
      .populate('customer_id', 'name email image_url') // populate customer fields
      .sort({ date: -1 })
      .skip(offset)
      .limit(ITEMS_PER_PAGE)
      .lean();

    // Format output to match your original fields
    return invoices.map(inv => ({
      id: inv._id,
      amount: inv.amount,
      date: inv.date,
      status: inv.status,
      name: inv.customer_id?.name,
      email: inv.customer_id?.email,
      image_url: inv.customer_id?.image_url,
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}
