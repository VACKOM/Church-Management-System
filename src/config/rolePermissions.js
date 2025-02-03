// src/config/rolePermissions.js
const rolePermissions = {
    // Admin role with full permissions
    administrator: [
      'user:create', 'user:edit', 'user:delete', 'user:view',
      'center:create', 'center:edit', 'center:delete', 'center:view',
      'bacenta:create', 'bacenta:edit', 'bacenta:delete', 'bacenta:view',
      'role:manage', 'permission:manage', 'report:view', 'dashboard:view',
      'member:add', 'member:edit', 'member:view'
    ],
    
    // Bishop role with some management permissions 
    bishop: [
     'member:view',  'user:view', 'user:edit','center:view', 'bacenta:view','bacenta:edit', 'center:edit',
      'report:view', 'dashboard:view', 'role:manage', 'permission:manage','donation:view', 'attendance:view'
    ],
    
    // Lead Pastor role with user and center management
    lead_pastor: [
      'user:view', 'user:edit', 'center:view', 'member:view', 'center:edit', 'zone:view', 'zone:edit',
      'bacenta:view',  'report:view', 'dashboard:view', 'role:manage','attendance:view'
    ],
    
    // Center Manager role with member management and reports
    center: [
      'member:add','member:view', 'member:edit', 'bacenta:view','zone:view','dashboard:view', 
       'report:view', 'donation:view', 'attendance:view'
    ],
    // Zone Manager role with member management and reports
    zone: [
       'member:add','member:view', 'member:edit', 'bacenta:view','dashboard:view', 
       'report:view', 'donation:view', 'attendance:view'
    ],
    
    // Bacenta Leader role with basic bacenta and attendance management
    bacenta: [
      'member:add', 'member:edit', 'member:view', 'report:view', 'dashboard:view',
      'attendance:add', 'attendance:view', 'donation:add'
    ]
  };
  
  module.exports = rolePermissions;
  