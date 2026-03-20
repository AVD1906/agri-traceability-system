-- ============================================
-- Agri-Food Supply Traceability System
-- Sample Seed Data
-- ============================================

-- Note: Passwords are "password123" for all users
-- They will be properly hashed when created via the API

-- ============================================
-- 1. Insert Sample Users
-- ============================================
INSERT INTO users (username, password_hash, email, phone, role, full_name, address, status) VALUES
('admin', '$2b$10$placeholder', 'admin@agrifood.com', '9876543210', 'admin', 'System Administrator', 'Head Office, Bangalore', 'active'),
('farmer1', '$2b$10$placeholder', 'farmer1@agrifood.com', '9876543211', 'farmer', 'Ramesh Kumar', 'Village Road, Mysuru', 'active'),
('farmer2', '$2b$10$placeholder', 'farmer2@agrifood.com', '9876543212', 'farmer', 'Lakshmi Devi', 'Farm House, Hassan', 'active'),
('distributor1', '$2b$10$placeholder', 'dist1@agrifood.com', '9876543213', 'distributor', 'ABC Distribution Co', 'Industrial Area, Bangalore', 'active'),
('distributor2', '$2b$10$placeholder', 'dist2@agrifood.com', '9876543214', 'distributor', 'XYZ Logistics', 'Transport Hub, Mangalore', 'active'),
('retailer1', '$2b$10$placeholder', 'retail1@agrifood.com', '9876543215', 'retailer', 'Fresh Mart', 'MG Road, Bangalore', 'active'),
('retailer2', '$2b$10$placeholder', 'retail2@agrifood.com', '9876543216', 'retailer', 'Green Grocery', 'Brigade Road, Bangalore', 'active');

-- ============================================
-- 2. Insert Sample Products
-- ============================================
INSERT INTO products (product_name, category, description, unit_of_measure, shelf_life_days, perishable) VALUES
('Basmati Rice', 'grains', 'Premium quality aromatic basmati rice', 'kg', 365, FALSE),
('Tomato', 'vegetables', 'Fresh red tomatoes', 'kg', 7, TRUE),
('Alphonso Mango', 'fruits', 'Premium Alphonso mango from Ratnagiri', 'kg', 5, TRUE),
('Fresh Milk', 'dairy', 'Pure cow milk, pasteurized', 'liters', 3, TRUE),
('Whole Wheat', 'grains', 'Organic whole wheat grains', 'kg', 180, FALSE),
('Potato', 'vegetables', 'Farm fresh potatoes', 'kg', 30, TRUE),
('Chicken', 'meat', 'Fresh chicken, cleaned', 'kg', 2, TRUE),
('Banana', 'fruits', 'Robusta bananas', 'kg', 4, TRUE),
('Onion', 'vegetables', 'Red onions', 'kg', 60, TRUE),
('Apple', 'fruits', 'Kashmiri apples', 'kg', 14, TRUE);

-- ============================================
-- 3. Insert Sample Locations
-- ============================================
INSERT INTO locations (location_name, location_type, address_line1, address_line2, city, state, pincode, country, latitude, longitude, owner_id, status) VALUES
('Green Valley Farm', 'farm', 'Plot 123, Village Road', 'Near Temple', 'Mysuru', 'Karnataka', '570001', 'India', 12.2958, 76.6394, 2, 'active'),
('Sunshine Farm', 'farm', 'Survey No 456', 'Hebbal Village', 'Hassan', 'Karnataka', '573201', 'India', 13.0933, 76.1056, 3, 'active'),
('Central Warehouse', 'warehouse', '45 Industrial Area', 'Phase 2', 'Bangalore', 'Karnataka', '560001', 'India', 12.9716, 77.5946, 4, 'active'),
('North Distribution Hub', 'distribution_center', '12 Logistics Park', 'Near Highway', 'Bangalore', 'Karnataka', '560003', 'India', 12.9716, 77.5946, 5, 'active'),
('Fresh Mart Store', 'retail_store', '789 MG Road', 'Corner Shop', 'Bangalore', 'Karnataka', '560002', 'India', 12.9716, 77.5946, 6, 'active'),
('Green Grocery Store', 'retail_store', '456 Brigade Road', 'Ground Floor', 'Bangalore', 'Karnataka', '560025', 'India', 12.9716, 77.5946, 7, 'active'),
('ABC Cold Storage', 'warehouse', '78 Cold Chain Road', NULL, 'Mangalore', 'Karnataka', '575001', 'India', 12.9141, 74.8560, 5, 'active');

-- ============================================
-- Sample data successfully loaded!
-- Use the API to create batches, events, transactions, and quality checks
-- to avoid dummy/placeholder data
-- ============================================

-- Verify data loaded
SELECT 'Users:' as Table_Name, COUNT(*) as Count FROM users
UNION ALL
SELECT 'Products:', COUNT(*) FROM products
UNION ALL
SELECT 'Locations:', COUNT(*) FROM locations;

-- Show sample data
SELECT 'Sample Users:' as Info;
SELECT user_id, username, email, role, full_name FROM users;

SELECT 'Sample Products:' as Info;
SELECT product_id, product_name, category, shelf_life_days FROM products;

SELECT 'Sample Locations:' as Info;
SELECT location_id, location_name, location_type, city FROM locations;
