const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst({
    where: { email: "jaiswal2062@gmail.com" },
  });

  if (!user) {
    console.error(
      "User with email 'jaiswal2062@gmail.com' not found. Please create the user first."
    );
    return;
  }

  // // Categories;
  // const categories = await prisma.category.createMany({
  //   data: [
  //     {
  //       name: "Food & Dining",
  //       image: "https://via.placeholder.com/150",
  //       userId: user.id,
  //     },
  //     {
  //       name: "Entertainment",
  //       image: "https://via.placeholder.com/150",
  //       userId: user.id,
  //     },
  //     {
  //       name: "Transportation",
  //       image: "https://via.placeholder.com/150",
  //       userId: user.id,
  //     },
  //     {
  //       name: "Groceries",
  //       image: "https://via.placeholder.com/150",
  //       userId: user.id,
  //     },
  //     {
  //       name: "Bills & Utilities",
  //       image: "https://via.placeholder.com/150",
  //       userId: user.id,
  //     },
  //   ],
  // });

  // // Transaction Accounts
  // const transactionAccounts = await prisma.transactionAccount.createMany({
  //   data: [
  //     {
  //       name: "My Checking Account",
  //       type: "BANK",
  //       accountNo: "1234567890",
  //       userId: user.id,
  //     },
  //     {
  //       name: "My Credit Card",
  //       type: "CREDIT_CARD",
  //       accountNo: "1234-1234-1234-1234",
  //       userId: user.id,
  //     },
  //   ],
  // });

  // Transactions;
  // const transactions = await prisma.transaction.createMany({
  //   data: [
  //     {
  //       transaction_date: new Date("2024-08-20"),
  //       amount: 50.0,
  //       description: "Grocery shopping at Walmart",
  //       type: "DEBIT",
  //       account_id: "cm044sdku00053w56avk5jqnt", // My Checking Account
  //     },
  //     {
  //       transaction_date: new Date("2024-08-18"),
  //       amount: 25.0,
  //       description: "Movie ticket and popcorn",
  //       type: "DEBIT",
  //       account_id: "cm044sdku00053w56avk5jqnt", // My Checking Account
  //     },
  //     {
  //       transaction_date: new Date("2024-08-15"),
  //       amount: 100.0,
  //       description: "Restaurant dinner",
  //       type: "DEBIT",
  //       account_id: "cm044sdku00053w56avk5jqnt", // My Checking Account
  //     },
  //     {
  //       transaction_date: new Date("2024-08-10"),
  //       amount: 75.0,
  //       description: "Gas station refill",
  //       type: "DEBIT",
  //       account_id: "cm044sdku00053w56avk5jqnt", // My Checking Account
  //     },
  //     {
  //       transaction_date: new Date("2024-08-05"),
  //       amount: 120.0,
  //       description: "Utility bill payment",
  //       type: "DEBIT",
  //       account_id: "cm044sdku00053w56avk5jqnt", // My Credit Card
  //     },
  //   ],
  // });

  // Expenses;
  const expenses = await prisma.expense.createMany({
    data: [
      {
        amount: 50.0,
        description: "Grocery shopping at Walmart",
        date: new Date("2024-08-20"),
        categoryId: "cm044sd6b00003w56wezsonao", // Food & Dining
        userId: user.id,
      },
      {
        amount: 25.0,
        description: "Movie ticket",
        date: new Date("2024-08-18"),
        categoryId: "cm044sd6b00003w56wezsonao", // Food & Dining

        userId: user.id,
      },
      {
        amount: 15.0,
        description: "Movie popcorn",
        date: new Date("2024-08-18"),
        categoryId: "cm044sd6b00003w56wezsonao", // Food & Dining

        userId: user.id,
      },
      {
        amount: 100.0,
        description: "Restaurant dinner",
        date: new Date("2024-08-15"),
        categoryId: "cm044sd6b00003w56wezsonao", // Food & Dining

        userId: user.id,
      },
      {
        amount: 75.0,
        description: "Gas station refill",
        date: new Date("2024-08-10"),
        categoryId: "cm044sd6b00003w56wezsonao", // Food & Dining
        userId: user.id,
      },
      {
        amount: 120.0,
        description: "Utility bill payment",
        date: new Date("2024-08-05"),
        categoryId: "cm044sd6b00003w56wezsonao", // Food & Dining
        userId: user.id,
      },
    ],
  });

  console.log("Seed data created successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
