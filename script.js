// --- Bagian Struktur Data ---

// Kelas untuk merepresentasikan satu node
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Kelas untuk merepresentasikan struktur Binary Search Tree
class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    // Metode untuk menambahkan node baru
    insert(value) {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    // Fungsi bantuan rekursif untuk menempatkan node
    insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else if (newNode.value > node.value) {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
        // Jika nilai sudah ada, abaikan
    }
}

// --- Bagian Logika Utama & Visualisasi Canvas ---

window.onload = () => {
    // Dapatkan referensi ke elemen HTML
    const canvas = document.getElementById('treeCanvas');
    const ctx = canvas.getContext('2d');
    const insertBtn = document.getElementById('insertBtn');
    const valueInput = document.getElementById('nodeValueInput');
    const resetBtn = document.getElementById('resetBtn'); // BARU: Referensi tombol reset

    // BARU: Gunakan 'let' agar bisa di-reassign saat reset
    let bst = new BinarySearchTree();
    const NODE_RADIUS = 20;
    const Y_SPACING = 70;

    // Fungsi untuk menggambar satu node
    function drawNode(node, x, y) {
        // Lingkaran
        ctx.beginPath();
        ctx.arc(x, y, NODE_RADIUS, 0, 2 * Math.PI);
        ctx.strokeStyle = '#0056b3';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#eef7ff';
        ctx.fill();

        // Teks nilai
        ctx.fillStyle = '#333';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.value, x, y);
    }

    // Fungsi untuk menggambar garis antar node
    function drawLine(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1 + NODE_RADIUS); // Mulai dari bawah node induk
        ctx.lineTo(x2, y2 - NODE_RADIUS); // Berakhir di atas node anak
        ctx.strokeStyle = '#999';
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }
    
    // Fungsi rekursif untuk menggambar seluruh pohon
    function drawTree(node, x, y, xOffset) {
        if (node === null) {
            return;
        }

        // Gambar anak kiri
        if (node.left !== null) {
            const leftX = x - xOffset;
            const leftY = y + Y_SPACING;
            drawLine(x, y, leftX, leftY);
            drawTree(node.left, leftX, leftY, xOffset / 2);
        }

        // Gambar anak kanan
        if (node.right !== null) {
            const rightX = x + xOffset;
            const rightY = y + Y_SPACING;
            drawLine(x, y, rightX, rightY);
            drawTree(node.right, rightX, rightY, xOffset / 2);
        }
        
        // Gambar node saat ini (setelah garis agar tidak tumpang tindih)
        drawNode(node, x, y);
    }
    
    // Fungsi untuk menangani penambahan node
    function handleInsert() {
        const value = parseInt(valueInput.value, 10);
        if (isNaN(value)) {
            alert("Harap masukkan angka yang valid.");
            return;
        }

        bst.insert(value);
        valueInput.value = ''; // Kosongkan input field
        valueInput.focus();   // Fokus kembali ke input field

        // Bersihkan canvas dan gambar ulang pohon
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawTree(bst.root, canvas.width / 2, 50, canvas.width / 4);
    }
    
    // BARU: Fungsi untuk mereset pohon dan canvas
    function handleReset() {
        // Buat instance pohon yang baru dan kosong
        bst = new BinarySearchTree();
        // Bersihkan seluruh canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Fokuskan kembali ke input field untuk memulai lagi
        valueInput.focus();
        console.log("Pohon telah di-reset.");
    }

    // Tambahkan event listener ke tombol dan input field
    insertBtn.addEventListener('click', handleInsert);
    resetBtn.addEventListener('click', handleReset); // BARU: Event listener untuk tombol reset
    valueInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleInsert();
        }
    });
};