// utils/prismaErrorHandler.ts

import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

// Define a type for the error response
interface ErrorResponse {
  message: string;
  status: number;
}

// Handle Prisma errors and map them to HTTP status codes and messages
export function handlePrismaError(error: unknown): ErrorResponse {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P1000":
        return {
          message: "Authentication failed against database server",
          status: 401,
        };
      case "P1001":
        return { message: "Cannot reach database server", status: 503 };
      case "P1002":
        return { message: "Database server timed out", status: 504 };
      case "P1003":
        return { message: "Database does not exist", status: 404 };
      case "P1008":
        return { message: "Operations timed out", status: 504 };
      case "P1009":
        return { message: "Database already exists", status: 409 };
      case "P1010":
        return { message: "User denied access to database", status: 403 };
      case "P1011":
        return { message: "TLS connection error", status: 500 };
      case "P1012":
        return { message: "Prisma schema invalid", status: 400 };
      case "P1013":
        return { message: "Invalid database string", status: 400 };
      case "P1014":
        return { message: "Model for table does not exist", status: 404 };
      case "P1015":
        return { message: "Unsupported Prisma schema features", status: 400 };
      case "P1016":
        return { message: "Raw query parameter error", status: 400 };
      case "P1017":
        return { message: "Server closed the connection", status: 500 };
      case "P2000":
        return { message: "Value too long for column", status: 400 };
      case "P2001":
        return { message: "Record not found", status: 404 };
      case "P2002":
        return { message: "Unique constraint failed", status: 409 };
      case "P2003":
        return { message: "Foreign key constraint failed", status: 400 };
      case "P2004":
        return { message: "Constraint failed", status: 400 };
      case "P2005":
        return { message: "Invalid field value in database", status: 400 };
      case "P2006":
        return { message: "Invalid field value provided", status: 400 };
      case "P2007":
        return { message: "Data validation error", status: 400 };
      case "P2008":
        return { message: "Query parsing error", status: 400 };
      case "P2009":
        return { message: "Query validation error", status: 400 };
      case "P2010":
        return { message: "Raw query failed", status: 400 };
      case "P2011":
        return { message: "Null constraint violation", status: 400 };
      case "P2012":
        return { message: "Missing required value", status: 400 };
      case "P2013":
        return { message: "Missing required argument", status: 400 };
      case "P2014":
        return { message: "Relation violation", status: 400 };
      case "P2015":
        return { message: "Related record not found", status: 404 };
      case "P2016":
        return { message: "Query interpretation error", status: 400 };
      case "P2017":
        return { message: "Records not connected", status: 400 };
      case "P2018":
        return { message: "Required connected records not found", status: 404 };
      case "P2019":
        return { message: "Input error", status: 400 };
      case "P2020":
        return { message: "Value out of range for type", status: 400 };
      case "P2021":
        return { message: "Table does not exist", status: 404 };
      case "P2022":
        return { message: "Column does not exist", status: 404 };
      case "P2023":
        return { message: "Inconsistent column data", status: 500 };
      case "P2024":
        return { message: "Connection pool timeout", status: 500 };
      case "P2025":
        return { message: "Required records not found", status: 404 };
      case "P2026":
        return { message: "Unsupported feature used", status: 400 };
      case "P2027":
        return {
          message: "Multiple errors occurred during query execution",
          status: 500,
        };
      case "P2028":
        return { message: "Transaction API error", status: 500 };
      case "P2029":
        return { message: "Query parameter limit exceeded", status: 400 };
      case "P2030":
        return { message: "Fulltext index not found", status: 404 };
      case "P2031":
        return { message: "MongoDB replica set required", status: 400 };
      case "P2033":
        return { message: "Number exceeds 64-bit integer", status: 400 };
      case "P2034":
        return { message: "Transaction failed due to conflict", status: 409 };
      case "P2035":
        return { message: "Database assertion violation", status: 500 };
      case "P2036":
        return { message: "External connector error", status: 500 };
      case "P2037":
        return { message: "Too many database connections", status: 500 };
      case "P3000":
        return { message: "Failed to create database", status: 500 };
      case "P3001":
        return { message: "Destructive migration changes", status: 400 };
      case "P3002":
        return { message: "Migration rolled back", status: 400 };
      case "P3003":
        return { message: "Migration format invalid", status: 400 };
      case "P3004":
        return { message: "System database alteration error", status: 400 };
      case "P3005":
        return { message: "Non-empty database schema", status: 400 };
      case "P3006":
        return { message: "Migration failed on shadow database", status: 400 };
      case "P3007":
        return {
          message: "Unsupported preview features in schema",
          status: 400,
        };
      case "P3008":
        return { message: "Migration already applied", status: 409 };
      case "P3009":
        return {
          message: "Failed migrations found in target database",
          status: 400,
        };
      case "P3010":
        return { message: "Migration name too long", status: 400 };
      case "P3011":
        return { message: "Migration cannot be rolled back", status: 400 };
      case "P3012":
        return { message: "Migration not in failed state", status: 400 };
      case "P3013":
        return {
          message: "Datasource provider arrays deprecated",
          status: 400,
        };
      case "P3014":
        return { message: "Shadow database creation failed", status: 500 };
      case "P3015":
        return { message: "Migration file not found", status: 404 };
      case "P3016":
        return { message: "Fallback database reset failed", status: 500 };
      case "P3017":
        return { message: "Migration not found", status: 404 };
      case "P3018":
        return { message: "Migration failed to apply", status: 500 };
      case "P3019":
        return { message: "Datasource provider mismatch", status: 400 };
      case "P3020":
        return {
          message: "Shadow database creation disabled on Azure SQL",
          status: 400,
        };
      case "P3021":
        return { message: "Foreign keys cannot be created", status: 400 };
      case "P3022":
        return { message: "Direct DDL execution disabled", status: 400 };
      case "P4000":
        return { message: "Introspection operation failed", status: 500 };
      case "P4001":
        return { message: "Introspected database empty", status: 404 };
      case "P4002":
        return {
          message: "Inconsistent introspected database schema",
          status: 500,
        };
      case "P6000":
        return { message: "Server error", status: 500 };
      case "P6001":
        return { message: "Invalid data source", status: 400 };
      case "P6002":
        return { message: "Unauthorized API key", status: 401 };
      case "P6003":
        return { message: "Plan limit exceeded", status: 403 };
      default:
        return { message: "Unknown Prisma error", status: 500 };
    }
  } else if (error instanceof PrismaClientUnknownRequestError) {
    return { message: "Unknown request error", status: 500 };
  } else if (error instanceof PrismaClientRustPanicError) {
    return { message: "Prisma client panicked", status: 500 };
  } else if (error instanceof PrismaClientInitializationError) {
    return { message: "Prisma client initialization failed", status: 500 };
  } else if (error instanceof PrismaClientValidationError) {
    return { message: "Prisma client validation failed", status: 400 };
  } else {
    return { message: "Unexpected error occurred", status: 500 };
  }
}
