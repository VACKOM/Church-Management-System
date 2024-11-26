// src/config/rolePermissions.js
const rolePermissions = {
    // Admin role with full permissions
    administrator: [
      'user:create', 'user:edit', 'user:delete', 'user:view',
      'center:create', 'center:edit', 'center:delete', 'center:view',
      'bacenta:create', 'bacenta:edit', 'bacenta:delete', 'bacenta:view',
      'role:manage', 'permission:manage', 'report:view', 'dashboard:view'
    ],
    
    // Bishop role with some management permissions
    bishop: [
      'user:view', 'center:view', 'bacenta:view', 'center:create', 'center:edit',
      'report:view', 'dashboard:view', 'role:manage', 'permission:manage', 'bacenta:create',
      'donation:view', 'attendance:view'
    ],
    
    // Lead Pastor role with user and center management
    lead_pastor: [
      'user:view', 'user:edit', 'center:view', 'center:edit', 'bacenta:create',
      'bacenta:view', 'user:create', 'report:view', 'dashboard:view', 'role:manage',
      'attendance:view'
    ],
    
    // Director role with reporting and center management
    director: [
      'user:view', 'user:edit', 'report:view', 'center:view', 'bacenta:create',
      'bacenta:view', 'dashboard:view', 'donation:view', 'attendance:view'
    ],
    
    // Center Manager role with member management and reports
    center_manager: [
      'user:view', 'user:edit', 'member:view', 'member:edit', 'bacenta:view',
      'user:create', 'dashboard:view', 'report:view', 'donation:view', 'attendance:view'
    ],
    
    // Bacenta Leader role with basic bacenta and attendance management
    bacenta_leader: [
      'member:add', 'member:edit', 'member:view', 'bacenta:view', 'report:view', 'dashboard:view',
      'attendance:add', 'attendance:view', 'donation:add'
    ]
  };
  
  module.exports = rolePermissions;
  