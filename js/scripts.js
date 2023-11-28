// Particles JS Cool Background
document.addEventListener("DOMContentLoaded", function () {
    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#343a40" },
            shape: { type: "circle", stroke: { width: 0, color: "#000000" }, polygon: { nb_sides: 5 }, image: { src: "img/github.svg", width: 100, height: 100 } },
            opacity: { value: 0.5, random: false, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
            size: { value: 3, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
            line_linked: { enable: true, distance: 150, color: "#343a40", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
        },
        retina_detect: true
    });
});


// Create New Node into Blockchain Net using BeeConn API
function createNode() {
    var nodeName = document.getElementById("nodeName").value;
    var nodeType = document.getElementById("nodeType").value;
    var networkConfig = document.getElementById("networkConfig").value;
    var hardwareSpecs = document.getElementById("hardwareSpecs").value;

    var apiEndpoint = "https://beeconn.com/api/createNode";
    var requestData = {
        nodeName: nodeName,
        nodeType: nodeType,
        networkConfig: networkConfig,
        hardwareSpecs: hardwareSpecs
    };

    fetch(apiEndpoint, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })

    .then(response => {
        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Node Created!',
                text: 'The new node has been created successfully.',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to create the node. Please try again.',
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred. Please try again later.',
        });
    });
}


// Node Monitoring Section, Graphs & Figures
var nodeStatusData = {
    labels: ['Node 1', 'Node 2', 'Node 3', 'Node 4', 'Node 5'],
    datasets: [{
        label: 'Node Status',
        data: [10, 15, 8, 12, 20],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
    }]
};

var nodeLoadData = {
    labels: ['Node 1', 'Node 2', 'Node 3', 'Node 4', 'Node 5'],
    datasets: [{
        label: 'Node Load',
        data: [30, 25, 15, 20, 10],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
    }]
};

var nodeTransactionsData = {
    labels: ['Node 1', 'Node 2', 'Node 3', 'Node 4', 'Node 5'],
    datasets: [{
        label: 'Node Transactions',
        data: [50, 40, 60, 30, 45],
        backgroundColor: 'rgba(255, 205, 86, 0.2)',
        borderColor: 'rgba(255, 205, 86, 1)',
        borderWidth: 1
    }]
};

var nodeStorageData = {
    labels: ['Node 1', 'Node 2', 'Node 3', 'Node 4', 'Node 5'],
    datasets: [{
        label: 'Node Storage',
        data: [80, 60, 75, 90, 70], 
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    }]
};

var chartOptions = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
};

var ctxStatus = document.getElementById('nodesStatusChart').getContext('2d');
var nodesStatusChart = new Chart(ctxStatus, {
    type: 'line',
    data: nodeStatusData,
    options: chartOptions
});

var ctxLoad = document.getElementById('nodesLoadChart').getContext('2d');
var nodesLoadChart = new Chart(ctxLoad, {
    type: 'line',
    data: nodeLoadData,
    options: chartOptions
});

var ctxTransactions = document.getElementById('nodesTransactionsChart').getContext('2d');
var nodesTransactionsChart = new Chart(ctxTransactions, {
    type: 'line',
    data: nodeTransactionsData,
    options: chartOptions
});

var ctxStorage = document.getElementById('nodesStorageChart').getContext('2d');
var nodesStorageChart = new Chart(ctxStorage, {
    type: 'line',
    data: nodeStorageData,
    options: chartOptions
});