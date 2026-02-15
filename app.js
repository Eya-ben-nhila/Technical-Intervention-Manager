let interventions = [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', function() {
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');
    
    if (!userRole) {
        window.location.href = 'index.html';
        return;
    }
    
    document.getElementById('userRole').textContent = userRole.charAt(0).toUpperCase() + userRole.slice(1);
    document.getElementById('userName').textContent = userName;
    
    if (userRole === 'admin') {
        document.body.classList.add('admin-mode');
    }
    
    loadInterventions();
    updateStats();
    showSection('dashboard');
});

function logout() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    window.location.href = 'index.html';
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    document.getElementById(sectionId).classList.add('active');
    
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    if (event && event.target) {
        event.target.classList.add('active');
    } else {
        document.querySelector(`[onclick="showSection('${sectionId}')"]`).classList.add('active');
    }
    
    if (sectionId === 'interventions') {
        displayInterventions();
    } else if (sectionId === 'dashboard') {
        displayDashboardInterventions();
    }
}

function createIntervention(event) {
    event.preventDefault();
    
    const title = document.getElementById('interventionTitle').value;
    const description = document.getElementById('interventionDescription').value;
    const priority = document.getElementById('interventionPriority').value;
    const technician = document.getElementById('technicianSelect').value;
    
    const intervention = {
        id: Date.now(),
        title,
        description,
        priority,
        technician,
        status: 'todo',
        createdBy: localStorage.getItem('userName'),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    interventions.push(intervention);
    saveInterventions();
    updateStats();
    
    document.querySelector('.intervention-form').reset();
    
    showSection('interventions');
    displayInterventions();
}

function loadInterventions() {
    const saved = localStorage.getItem('interventions');
    if (saved) {
        interventions = JSON.parse(saved);
    } else {
        interventions = [
            {
                id: 1,
                title: 'Server Maintenance',
                description: 'Perform routine maintenance on main server',
                priority: 'high',
                technician: 'tech1',
                status: 'todo',
                createdBy: 'admin',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 2,
                title: 'Network Configuration',
                description: 'Update network settings for new office',
                priority: 'medium',
                technician: 'tech2',
                status: 'in-progress',
                createdBy: 'admin',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 3,
                title: 'Software Installation',
                description: 'Install required software on workstations',
                priority: 'low',
                technician: 'tech3',
                status: 'done',
                createdBy: 'admin',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ];
        saveInterventions();
    }
}

function saveInterventions() {
    localStorage.setItem('interventions', JSON.stringify(interventions));
}

function updateStats() {
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');
    
    let filteredInterventions = interventions;
    
    if (userRole === 'technician') {
        const technicianId = getTechnicianId(userName);
        filteredInterventions = interventions.filter(i => i.technician === technicianId);
    }
    
    const total = filteredInterventions.length;
    const todo = filteredInterventions.filter(i => i.status === 'todo').length;
    const inProgress = filteredInterventions.filter(i => i.status === 'in-progress').length;
    const done = filteredInterventions.filter(i => i.status === 'done').length;
    
    document.getElementById('totalInterventions').textContent = total;
    document.getElementById('todoCount').textContent = todo;
    document.getElementById('inProgressCount').textContent = inProgress;
    document.getElementById('doneCount').textContent = done;
    
    displayDashboardInterventions();
}

function filterInterventions(filter) {
    currentFilter = filter;
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    displayInterventions();
}

function displayInterventions() {
    const container = document.getElementById('interventionsList');
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');
    
    let filtered = interventions;
    
    if (currentFilter !== 'all') {
        filtered = interventions.filter(i => i.status === currentFilter);
    }
    
    if (userRole === 'technician') {
        const technicianId = getTechnicianId(userName);
        filtered = filtered.filter(i => i.technician === technicianId);
    }
    
    container.innerHTML = '';
    
    if (filtered.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #a0a0a0;">No interventions found</p>';
        return;
    }
    
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    filtered.forEach(intervention => {
        const card = createInterventionCard(intervention, userRole);
        container.appendChild(card);
    });
}

function createInterventionCard(intervention, userRole) {
    const card = document.createElement('div');
    card.className = 'intervention-card';
    
    const technicianNames = {
        'tech1': 'John Smith',
        'tech2': 'Sarah Johnson',
        'tech3': 'Mike Wilson'
    };
    
    card.innerHTML = `
        <div class="intervention-header">
            <div>
                <h3 class="intervention-title">${intervention.title}</h3>
            </div>
            <span class="intervention-priority priority-${intervention.priority}">${intervention.priority}</span>
        </div>
        <p class="intervention-description">${intervention.description}</p>
        <div class="intervention-meta">
            <span>Assigned to: ${technicianNames[intervention.technician]}</span>
            <span>Assigned by: ${intervention.createdBy}</span>
            <span>Created: ${new Date(intervention.createdAt).toLocaleDateString()}</span>
        </div>
        <div class="intervention-actions">
            <span class="intervention-status status-${intervention.status}">${intervention.status.replace('-', ' ')}</span>
            ${userRole === 'technician' ? createTechnicianActions(intervention) : ''}
        </div>
    `;
    
    return card;
}

function createTechnicianActions(intervention) {
    let actions = '';
    
    if (intervention.status === 'todo') {
        actions += `<button class="action-btn" onclick="updateInterventionStatus(${intervention.id}, 'in-progress')">Start Work</button>`;
    } else if (intervention.status === 'in-progress') {
        actions += `<button class="action-btn" onclick="updateInterventionStatus(${intervention.id}, 'done')">Complete</button>`;
    }
    
    return actions;
}

function updateInterventionStatus(id, newStatus) {
    const intervention = interventions.find(i => i.id === id);
    if (intervention) {
        intervention.status = newStatus;
        intervention.updatedAt = new Date().toISOString();
        saveInterventions();
        updateStats();
        displayInterventions();
    }
}

function getTechnicianId(userName) {
    const technicianMap = {
        'John Smith': 'tech1',
        'Sarah Johnson': 'tech2',
        'Mike Wilson': 'tech3'
    };
    return technicianMap[userName] || 'tech1';
}

function displayDashboardInterventions() {
    const container = document.getElementById('dashboardInterventions');
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');
    
    let filtered = interventions;
    
    if (userRole === 'technician') {
        const technicianId = getTechnicianId(userName);
        filtered = interventions.filter(i => i.technician === technicianId);
    }
    
    container.innerHTML = '';
    
    if (filtered.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #a0a0a0; padding: 20px;">No interventions found</p>';
        return;
    }
    
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    const recentInterventions = filtered.slice(0, 5);
    
    recentInterventions.forEach(intervention => {
        const card = createPreviewCard(intervention, userRole);
        container.appendChild(card);
    });
}

function createPreviewCard(intervention, userRole) {
    const card = document.createElement('div');
    card.className = 'preview-card';
    card.onclick = () => {
        showSection('interventions');
        displayInterventions();
    };
    
    const technicianNames = {
        'tech1': 'John Smith',
        'tech2': 'Sarah Johnson',
        'tech3': 'Mike Wilson'
    };
    
    card.innerHTML = `
        <div class="preview-header">
            <span class="preview-title">${intervention.title}</span>
            <span class="preview-status status-${intervention.status}">${intervention.status.replace('-', ' ')}</span>
        </div>
        <div class="preview-meta">
            <span>${technicianNames[intervention.technician]}</span>
            <span>${userRole === 'technician' ? `By: ${intervention.createdBy}` : new Date(intervention.createdAt).toLocaleDateString()}</span>
        </div>
    `;
    
    return card;
}
