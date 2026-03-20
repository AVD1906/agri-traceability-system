# Database Schema - Agri-Food Traceability System

## 📊 Overview

MySQL database with **7 tables** tracking the complete supply chain from farm to consumer.

## 🗄️ Database Name
```sql
agri_traceability
```

## 📁 Files

```
database/
├── schema.sql              # Complete table creation
├── seed.sql               # Sample data
├── indexes.sql            # Performance indexes
├── ER_Diagram.png         # Visual diagram
└── README.md              # This file
```

## 📋 Table Descriptions

### 1. users
Stores all system users with authentication credentials.

**Purpose:** Authentication, authorization, and user profiles

**Relationships:**
- Has many locations (owner)
- Has many batches (farmer)
- Has many batches (current_owner)
- Has many supply_chain_events (actor)
- Has many transactions (seller)
- Has many transactions (buyer)
- Has many quality_checks (inspector)

### 2. products
Catalog of all food products that can be tracked.

**Purpose:** Product master data

**Relationships:**
- Has many batches

### 3. locations
Physical locations in the supply chain.

**Purpose:** Track farms, warehouses, distribution centers, retail stores

**Relationships:**
- Belongs to user (owner)
- Has many batches (current_location)
- Has many supply_chain_events (from_location)
- Has many supply_chain_events (to_location)

### 4. batches
Core tracking entities - specific lots of products.

**Purpose:** Main traceability object

**Relationships:**
- Belongs to product
- Belongs to user (farmer)
- Belongs to user (current_owner)
- Belongs to location (current_location)
- Has many supply_chain_events
- Has many transactions
- Has many quality_checks

### 5. supply_chain_events
Complete audit trail of all batch movements.

**Purpose:** Track every action on a batch

**Relationships:**
- Belongs to batch
- Belongs to user (actor)
- Belongs to location (from_location)
- Belongs to location (to_location)

### 6. transactions
Financial records of batch sales.

**Purpose:** Track ownership transfers and payments

**Relationships:**
- Belongs to batch
- Belongs to user (seller)
- Belongs to user (buyer)

### 7. quality_checks
Quality inspection records.

**Purpose:** Track quality assessments at various stages

**Relationships:**
- Belongs to batch
- Belongs to user (inspector)
- Belongs to location (check_location)

## 🔑 Key Relationships

```
users (1) → (N) locations
users (1) → (N) batches (as farmer)
users (1) → (N) batches (as current_owner)
products (1) → (N) batches
locations (1) → (N) batches
batches (1) → (N) supply_chain_events
batches (1) → (N) transactions
batches (1) → (N) quality_checks
users (1) → (N) supply_chain_events (as actor)
locations (1) → (N) supply_chain_events (as from/to)
users (1) → (N) transactions (as seller/buyer)
users (1) → (N) quality_checks (as inspector)
```

## 📈 ER Diagram

```
┌─────────┐         ┌──────────┐         ┌─────────┐
│  users  │────────▶│ locations│         │products │
└─────────┘         └──────────┘         └─────────┘
     │                    │                    │
     │                    │                    │
     └────────┬───────────┴───────────┬────────┘
              │                       │
              ▼                       ▼
         ┌─────────────────────────────┐
         │         batches             │
         └─────────────────────────────┘
                     │
         ┌───────────┼───────────┐
         │           │           │
         ▼           ▼           ▼
┌──────────────┐ ┌──────────┐ ┌──────────────┐
│supply_chain_ │ │transactions│ │quality_checks│
│   events     │ └──────────┘ └──────────────┘
└──────────────┘
```

## 🔍 Important Indexes

```sql
-- Users
INDEX idx_users_username (username)
INDEX idx_users_email (email)
INDEX idx_users_role (role)

-- Products
INDEX idx_products_category (category)

-- Locations
INDEX idx_location_type (location_type)
INDEX idx_location_owner (owner_id)

-- Batches
INDEX idx_batch_farmer (farmer_id)
INDEX idx_batch_owner (current_owner_id)
INDEX idx_batch_status (status)
INDEX idx_batch_location (current_location_id)
INDEX idx_batch_product (product_id)

-- Supply Chain Events
INDEX idx_event_batch (batch_id)
INDEX idx_event_type (event_type)
INDEX idx_event_timestamp (timestamp)
INDEX idx_event_actor (actor_id)

-- Transactions
INDEX idx_transaction_batch (batch_id)
INDEX idx_transaction_seller (seller_id)
INDEX idx_transaction_buyer (buyer_id)
INDEX idx_transaction_date (transaction_date)

-- Quality Checks
INDEX idx_quality_batch (batch_id)
INDEX idx_quality_checker (checked_by)
INDEX idx_quality_date (check_date)
INDEX idx_quality_passed (passed)
```

## 📊 Data Types & Constraints

### ENUM Values

**users.role:**
- `farmer` - Creates and manages batches
- `distributor` - Transports and stores batches
- `retailer` - Sells to consumers
- `admin` - System administrator

**products.category:**
- `grains` - Rice, wheat, etc.
- `vegetables` - Tomato, potato, etc.
- `fruits` - Mango, apple, etc.
- `dairy` - Milk, cheese, etc.
- `meat` - Chicken, etc.

**locations.location_type:**
- `farm` - Agricultural production
- `warehouse` - Storage facility
- `distribution_center` - Distribution hub
- `retail_store` - Retail outlet
- `other` - Other locations

**batches.status:**
- `harvested` - Just harvested
- `in_transit` - Being transported
- `stored` - In storage
- `sold` - Sold to consumer

**supply_chain_events.event_type:**
- `harvest` - Initial harvesting
- `storage` - Moved to storage
- `transport` - In transportation
- `quality_check` - Quality inspection
- `handoff` - Transferred between parties
- `retail` - Reached retail
- `sold` - Final sale

**transactions.payment_status:**
- `pending` - Payment pending
- `completed` - Payment done
- `failed` - Payment failed

**quality_checks.grade_assigned:**
- `A` - Excellent quality
- `B` - Good quality
- `C` - Average quality
- `Failed` - Did not pass inspection

## 🛠️ Setup Commands

### Create Database
```sql
CREATE DATABASE agri_traceability;
USE agri_traceability;
```

### Load Schema
```sql
SOURCE schema.sql;
```

### Load Seed Data
```sql
SOURCE seed.sql;
```

### Verify Setup
```sql
SHOW TABLES;
-- Should show 7 tables

SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM products;
SELECT COUNT(*) FROM locations;
-- etc.
```

## 🔐 Database User Permissions

For production, create dedicated user:

```sql
CREATE USER 'agri_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON agri_traceability.* TO 'agri_user'@'localhost';
FLUSH PRIVILEGES;
```

## 📝 Sample Queries

### Get Complete Batch Information
```sql
SELECT 
    b.batch_number,
    b.quantity,
    b.status,
    p.product_name,
    u1.full_name as farmer_name,
    u2.full_name as current_owner_name,
    l.location_name as current_location
FROM batches b
JOIN products p ON b.product_id = p.product_id
JOIN users u1 ON b.farmer_id = u1.user_id
JOIN users u2 ON b.current_owner_id = u2.user_id
LEFT JOIN locations l ON b.current_location_id = l.location_id
WHERE b.batch_id = 1;
```

### Get Batch Timeline
```sql
SELECT 
    e.event_type,
    e.timestamp,
    u.full_name as actor_name,
    l1.location_name as from_location,
    l2.location_name as to_location,
    e.quantity_transferred,
    e.quantity_lost
FROM supply_chain_events e
JOIN users u ON e.actor_id = u.user_id
LEFT JOIN locations l1 ON e.from_location_id = l1.location_id
LEFT JOIN locations l2 ON e.to_location_id = l2.location_id
WHERE e.batch_id = 1
ORDER BY e.timestamp;
```

### Leakage Analysis
```sql
SELECT 
    event_type,
    SUM(quantity_lost) as total_leakage,
    COUNT(*) as event_count,
    AVG(quantity_lost) as avg_leakage
FROM supply_chain_events
WHERE quantity_lost > 0
GROUP BY event_type
ORDER BY total_leakage DESC;
```

### Revenue by User
```sql
SELECT 
    u.full_name,
    u.role,
    COUNT(t.transaction_id) as total_sales,
    SUM(t.total_amount) as total_revenue
FROM users u
JOIN transactions t ON u.user_id = t.seller_id
GROUP BY u.user_id
ORDER BY total_revenue DESC;
```

## 🔄 Database Migrations

For schema changes, create migration files:
```
migrations/
├── 001_initial_schema.sql
├── 002_add_indexes.sql
└── 003_add_humidity_field.sql
```

## 💾 Backup & Restore

### Backup
```bash
mysqldump -u root -p agri_traceability > backup_$(date +%Y%m%d).sql
```

### Restore
```bash
mysql -u root -p agri_traceability < backup_20260321.sql
```

## 📊 Database Size Estimates

For 1 year of operations:
- **users:** ~100 rows
- **products:** ~50 rows
- **locations:** ~200 rows
- **batches:** ~10,000 rows
- **supply_chain_events:** ~50,000 rows
- **transactions:** ~8,000 rows
- **quality_checks:** ~15,000 rows

**Total:** ~83,500 rows
**Estimated Size:** ~50-100 MB

## 🔧 Optimization Tips

1. **Use Indexes** - Already defined for common queries
2. **Limit SELECT \*** - Specify needed columns
3. **Use EXPLAIN** - Analyze query performance
4. **Regular ANALYZE TABLE** - Update statistics
5. **Archive Old Data** - Move old records to archive tables

## 📞 Support

For database issues, contact: [Your Database Admin]
