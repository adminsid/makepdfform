<script lang="ts">
  const users = [
    { id: 'usr_89234', name: 'Elena Developer', email: 'elena@techcorp.io', plan: 'Enterprise', role: 'Developer', roleIcon: 'terminal', lastLogin: '2 mins ago', ip: '192.168.1.1', status: 'Active', selected: true },
    { id: 'usr_12345', name: 'Alex Standard', email: 'alex.s@gmail.com', plan: 'Pro', role: 'Standard', roleIcon: 'person', lastLogin: 'Yesterday', ip: '10.0.0.42', status: 'Active' },
    { id: 'usr_54321', name: 'John Doe', email: 'jdoe@company.net', plan: 'Free', role: 'Standard', roleIcon: 'person', lastLogin: '3 days ago', status: 'Active' },
    { id: 'usr_00001', name: 'Master Admin', email: 'root@makepdfform.com', plan: 'Internal', role: 'Admin', roleIcon: 'admin_panel_settings', lastLogin: 'Active Now', status: 'Online' },
    { id: 'usr_bot01', name: 'Spam Bot', email: 'bot@spam.net', plan: 'Free', role: 'Banned', roleIcon: 'block', lastLogin: 'Oct 24, 2023', status: 'Banned' },
  ];
</script>

<div class="table-container">
  <div class="scroll-area">
    <table class="users-table">
      <thead>
        <tr>
          <th class="check-col"><input type="checkbox" class="checkbox" /></th>
          <th>User <span class="material-symbols-outlined sort-icon">arrow_downward</span></th>
          <th>Plan</th>
          <th>Role</th>
          <th>Last Login <span class="material-symbols-outlined sort-icon active">arrow_downward</span></th>
          <th class="right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each users as user}
          <tr class:selected={user.selected} class:banned={user.role === 'Banned'}>
            <td class="check-col"><input type="checkbox" class="checkbox" checked={user.selected} /></td>
            <td>
              <div class="user-info">
                <div class="avatar" class:dark-avatar={user.role === 'Admin' || user.role === 'Developer'}>
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div class="name" class:line-through={user.role === 'Banned'}>{user.name}</div>
                  <div class="email">{user.email}</div>
                </div>
              </div>
            </td>
            <td>
              <span class="plan-badge" class:enterprise={user.plan === 'Enterprise'} class:internal={user.plan === 'Internal'}>
                {user.plan}
              </span>
            </td>
            <td>
              <div class="role-cell">
                <span class="material-symbols-outlined role-icon">{user.roleIcon}</span>
                <span class="role-name" class:banned-text={user.role === 'Banned'}>{user.role}</span>
              </div>
            </td>
            <td>
              <div class="last-login">{user.lastLogin}</div>
              {#if user.status === 'Online'}
                <div class="online-status">● Online</div>
              {:else if user.ip}
                <div class="ip-addr">{user.ip}</div>
              {/if}
            </td>
            <td class="right">
              <button class="manage-btn" class:primary={user.selected}>
                Manage Permissions
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  
  <div class="table-footer">
    <span class="footer-text">Showing 1-5 of 1,248 users</span>
    <div class="pagination">
      <button class="page-nav-btn"><span class="material-symbols-outlined">chevron_left</span></button>
      <button class="page-num-btn active">1</button>
      <button class="page-num-btn">2</button>
      <button class="page-num-btn">3</button>
      <span class="sep">...</span>
      <button class="page-num-btn">24</button>
      <button class="page-nav-btn"><span class="material-symbols-outlined">chevron_right</span></button>
    </div>
  </div>
</div>

<style>
  .table-container { flex: 1; display: flex; flex-direction: column; overflow: hidden; background-color: #ffffff; }
  :global(.dark) .table-container { background-color: #000000; }

  .scroll-area { flex: 1; overflow: auto; }

  .users-table { width: 100%; border-collapse: collapse; text-align: left; }

  thead { position: sticky; top: 0; z-index: 10; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb; }
  :global(.dark) thead { background-color: #171717; border-bottom-color: #404040; }

  th { padding: 0.75rem 1rem; font-size: 0.625rem; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; }

  .sort-icon { font-size: 0.75rem; vertical-align: middle; opacity: 0; transition: opacity 0.2s; }
  th:hover .sort-icon { opacity: 0.5; }
  .sort-icon.active { opacity: 1; }

  td { padding: 0.75rem 1rem; border-bottom: 1px solid #f3f4f6; vertical-align: middle; }
  :global(.dark) td { border-bottom-color: #1f2937; }

  tr:hover { background-color: #f9fafb; }
  :global(.dark) tr:hover { background-color: #111827; }

  tr.selected { background-color: rgba(249, 250, 251, 0.5); }
  :global(.dark) tr.selected { background-color: rgba(17, 24, 39, 0.5); }

  tr.banned { background-color: rgba(239, 68, 68, 0.05); }

  .check-col { width: 3rem; text-align: center; }

  .checkbox { width: 0.875rem; height: 0.875rem; border: 1px solid #d1d5db; border-radius: 0.125rem; accent-color: #000000; }

  .user-info { display: flex; align-items: center; gap: 0.75rem; }

  .avatar { width: 2rem; height: 2rem; background-color: #e5e7eb; border-radius: 0.125rem; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; color: #4b5563; }
  :global(.dark) .avatar { background-color: #262626; color: #d1d5db; }

  .avatar.dark-avatar { background-color: #000000; color: #ffffff; }
  :global(.dark) .avatar.dark-avatar { background-color: #ffffff; color: #000000; }

  .name { font-size: 0.75rem; font-weight: 700; color: #111827; }
  :global(.dark) .name { color: #ffffff; }

  .line-through { text-decoration: line-through; text-decoration-color: #ef4444; }

  .email { font-size: 0.625rem; color: #6b7280; }

  .plan-badge { padding: 0.125rem 0.5rem; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 0.125rem; font-size: 0.625rem; font-weight: 500; color: #4b5563; }
  :global(.dark) .plan-badge { background-color: transparent; border-color: #404040; color: #d1d5db; }

  .plan-badge.enterprise { background-color: #f9fafb; }
  .plan-badge.internal { background-color: #000000; color: #ffffff; border: none; }
  :global(.dark) .plan-badge.internal { background-color: #ffffff; color: #000000; }

  .role-cell { display: flex; align-items: center; gap: 0.375rem; }

  .role-icon { font-size: 1rem; color: #9ca3af; }

  .role-name { font-size: 0.75rem; font-weight: 500; color: #374151; }
  :global(.dark) .role-name { color: #d1d5db; }

  .banned-text { color: #ef4444; }

  .last-login { font-size: 0.75rem; color: #4b5563; }
  :global(.dark) .last-login { color: #d1d5db; }

  .ip-addr { font-size: 0.625rem; color: #9ca3af; }

  .online-status { font-size: 0.625rem; color: #16a34a; font-family: monospace; }

  .right { text-align: right; }

  .manage-btn { padding: 0.375rem 0.75rem; border: 1px solid #e5e7eb; background-color: #ffffff; font-size: 0.625rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; border-radius: 0.125rem; transition: all 0.2s; }
  :global(.dark) .manage-btn { border-color: #404040; background-color: transparent; color: #ffffff; }

  .manage-btn.primary { background-color: #000000; color: #ffffff; border-color: #000000; }
  :global(.dark) .manage-btn.primary { background-color: #ffffff; color: #000000; border-color: #ffffff; }

  .manage-btn:hover { border-color: #000000; }
  :global(.dark) .manage-btn:hover { border-color: #ffffff; }

  .table-footer { height: 3rem; padding: 0 1rem; border-top: 1px solid #e5e7eb; background-color: #ffffff; display: flex; justify-content: space-between; align-items: center; }
  :global(.dark) .table-footer { background-color: #171717; border-top-color: #404040; }

  .footer-text { font-size: 0.625rem; color: #6b7280; }

  .pagination { display: flex; align-items: center; gap: 0.25rem; }

  .page-num-btn { width: 1.75rem; height: 1.75rem; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 500; border: none; background: transparent; cursor: pointer; border-radius: 0.125rem; }

  .page-num-btn:hover { background-color: #f3f4f6; }
  :global(.dark) .page-num-btn:hover { background-color: #262626; }

  .page-num-btn.active { background-color: #000000; color: #ffffff; font-weight: 700; }
  :global(.dark) .page-num-btn.active { background-color: #ffffff; color: #000000; }

  .page-nav-btn { width: 1.75rem; height: 1.75rem; display: flex; align-items: center; justify-content: center; border: none; background: transparent; cursor: pointer; color: #9ca3af; }

  .page-nav-btn:hover { background-color: #f3f4f6; }
  .page-nav-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .sep { color: #d1d5db; font-size: 0.75rem; }
</style>
