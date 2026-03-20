-- ============================================
-- Agri-Food Supply Traceability System
-- Complete Database Schema
-- 7 Tables with Relationships
-- ============================================

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS quality_checks;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS supply_chain_events;
DROP TABLE IF EXISTS batches;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

-- ============================================
-- TABLE 1: users
-- Purpose: Authentication and user profiles
-- ============================================
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    role ENUM('farmer', 'distributor', 'retailer', 'admin') NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    address TEXT,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE 2: products
-- Purpose: Food product catalog
-- ============================================
CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    category ENUM('grains', 'vegetables', 'fruits', 'dairy', 'meat') NOT NULL,
    description TEXT,
    unit_of_measure ENUM('kg', 'liters', 'units') NOT NULL,
    shelf_life_days INT NOT NULL,
    perishable BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_category (category),
    INDEX idx_product_name (product_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE 3: locations
-- Purpose: Physical locations in supply chain
-- ============================================
CREATE TABLE locations (
    location_id INT PRIMARY KEY AUTO_INCREMENT,
    location_name VARCHAR(100) NOT NULL,
    location_type ENUM('farm', 'warehouse', 'distribution_center', 'retail_store', 'other') NOT NULL,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    country VARCHAR(50) DEFAULT 'India',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    owner_id INT,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (owner_id) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_location_type (location_type),
    INDEX idx_location_owner (owner_id),
    INDEX idx_location_city (city)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE 4: batches
-- Purpose: Core tracking entities (specific lots)
-- ============================================
CREATE TABLE batches (
    batch_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    farmer_id INT NOT NULL,
    batch_number VARCHAR(50) UNIQUE NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit ENUM('kg', 'liters', 'units') NOT NULL,
    harvest_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    quality_grade ENUM('A', 'B', 'C') DEFAULT 'B',
    current_location_id INT,
    current_owner_id INT NOT NULL,
    status ENUM('harvested', 'in_transit', 'stored', 'sold') DEFAULT 'harvested',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE RESTRICT,
    FOREIGN KEY (farmer_id) REFERENCES users(user_id) ON DELETE RESTRICT,
    FOREIGN KEY (current_owner_id) REFERENCES users(user_id) ON DELETE RESTRICT,
    FOREIGN KEY (current_location_id) REFERENCES locations(location_id) ON DELETE SET NULL,
    
    INDEX idx_batch_farmer (farmer_id),
    INDEX idx_batch_owner (current_owner_id),
    INDEX idx_batch_status (status),
    INDEX idx_batch_location (current_location_id),
    INDEX idx_batch_product (product_id),
    INDEX idx_batch_number (batch_number),
    INDEX idx_harvest_date (harvest_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE 5: supply_chain_events
-- Purpose: Complete audit trail of batch movements
-- ============================================
CREATE TABLE supply_chain_events (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    batch_id INT NOT NULL,
    event_type ENUM('harvest', 'storage', 'transport', 'quality_check', 'handoff', 'retail', 'sold') NOT NULL,
    actor_id INT NOT NULL,
    from_location_id INT,
    to_location_id INT,
    quantity_transferred DECIMAL(10,2),
    quantity_lost DECIMAL(10,2) DEFAULT 0,
    temperature_celsius DECIMAL(5,2),
    humidity_percent DECIMAL(5,2),
    notes TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verified BOOLEAN DEFAULT FALSE,
    verified_by INT,
    
    FOREIGN KEY (batch_id) REFERENCES batches(batch_id) ON DELETE CASCADE,
    FOREIGN KEY (actor_id) REFERENCES users(user_id) ON DELETE RESTRICT,
    FOREIGN KEY (from_location_id) REFERENCES locations(location_id) ON DELETE SET NULL,
    FOREIGN KEY (to_location_id) REFERENCES locations(location_id) ON DELETE SET NULL,
    FOREIGN KEY (verified_by) REFERENCES users(user_id) ON DELETE SET NULL,
    
    INDEX idx_event_batch (batch_id),
    INDEX idx_event_type (event_type),
    INDEX idx_event_timestamp (timestamp),
    INDEX idx_event_actor (actor_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE 6: transactions
-- Purpose: Financial records and ownership transfers
-- ============================================
CREATE TABLE transactions (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    batch_id INT NOT NULL,
    seller_id INT NOT NULL,
    buyer_id INT NOT NULL,
    quantity_sold DECIMAL(10,2) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_amount DECIMAL(12,2) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    payment_method ENUM('cash', 'bank_transfer', 'upi', 'card') DEFAULT 'cash',
    invoice_number VARCHAR(50) UNIQUE,
    notes TEXT,
    
    FOREIGN KEY (batch_id) REFERENCES batches(batch_id) ON DELETE RESTRICT,
    FOREIGN KEY (seller_id) REFERENCES users(user_id) ON DELETE RESTRICT,
    FOREIGN KEY (buyer_id) REFERENCES users(user_id) ON DELETE RESTRICT,
    
    INDEX idx_transaction_batch (batch_id),
    INDEX idx_transaction_seller (seller_id),
    INDEX idx_transaction_buyer (buyer_id),
    INDEX idx_transaction_date (transaction_date),
    INDEX idx_invoice_number (invoice_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE 7: quality_checks
-- Purpose: Quality inspection records
-- ============================================
CREATE TABLE quality_checks (
    check_id INT PRIMARY KEY AUTO_INCREMENT,
    batch_id INT NOT NULL,
    checked_by INT NOT NULL,
    check_location_id INT,
    check_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    passed BOOLEAN NOT NULL,
    grade_assigned ENUM('A', 'B', 'C', 'Failed'),
    moisture_content DECIMAL(5,2),
    contamination_detected BOOLEAN DEFAULT FALSE,
    contamination_type VARCHAR(100),
    temperature_at_check DECIMAL(5,2),
    visual_inspection_notes TEXT,
    lab_test_results TEXT,
    remarks TEXT,
    
    FOREIGN KEY (batch_id) REFERENCES batches(batch_id) ON DELETE CASCADE,
    FOREIGN KEY (checked_by) REFERENCES users(user_id) ON DELETE RESTRICT,
    FOREIGN KEY (check_location_id) REFERENCES locations(location_id) ON DELETE SET NULL,
    
    INDEX idx_quality_batch (batch_id),
    INDEX idx_quality_checker (checked_by),
    INDEX idx_quality_date (check_date),
    INDEX idx_quality_passed (passed)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Schema Creation Complete
-- ============================================

-- Verify tables created
SHOW TABLES;

-- Show table structures
DESCRIBE users;
DESCRIBE products;
DESCRIBE locations;
DESCRIBE batches;
DESCRIBE supply_chain_events;
DESCRIBE transactions;
DESCRIBE quality_checks;
