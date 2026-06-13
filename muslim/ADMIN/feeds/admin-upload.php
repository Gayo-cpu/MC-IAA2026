<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MCIAA Admin Dashboard - Post News</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary-green: #1e3d1a;
            --accent-gold: #d4af37;
            --clean-white: #ffffff;
            --text-dark: #2b2b2b;
            --bg-light: #f8faf8;
        }
        body {
            margin: 0;
            padding: 40px 20px;
            font-family: 'Segoe UI', sans-serif;
            background-color: var(--bg-light);
            color: var(--text-dark);
        }
        .admin-container {
            max-width: 750px;
            margin: 0 auto;
        }
        .form-card {
            background: var(--clean-white);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 15px 35px rgba(30, 61, 26, 0.06);
            border: 1px solid rgba(30, 61, 26, 0.05);
        }
        .card-header {
            text-align: center;
            margin-bottom: 30px;
        }
        .card-header h3 {
            font-size: 1.8rem;
            color: var(--primary-green);
            margin: 0 0 8px 0;
        }
        .input-group {
            margin-bottom: 22px;
        }
        .input-group label {
            display: block;
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 8px;
            color: var(--primary-green);
        }
        .input-group label i {
            margin-right: 5px;
            color: var(--accent-gold);
        }
        .input-group input, 
        .input-group select, 
        .input-group textarea {
            width: 100%;
            padding: 13px 16px;
            border: 1px solid #e2e8e2;
            border-radius: 10px;
            font-size: 0.95rem;
            background-color: #fafdfa;
            box-sizing: border-box;
            transition: all 0.3s ease;
        }
        .input-group input:focus, 
        .input-group select:focus, 
        .input-group textarea:focus {
            outline: none;
            border-color: var(--primary-green);
            box-shadow: 0 0 0 3px rgba(30, 61, 26, 0.08);
            background-color: var(--clean-white);
        }
        .submit-btn {
            width: 100%;
            background: linear-gradient(135deg, #e6c143, var(--accent-gold));
            color: #11240f;
            border: none;
            padding: 15px;
            font-size: 1rem;
            font-weight: 700;
            border-radius: 10px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            box-shadow: 0 5px 15px rgba(212, 175, 55, 0.25);
            transition: all 0.3s ease;
        }
        .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(212, 175, 55, 0.35);
        }
        .alert {
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-weight: 600;
            text-align: center;
        }
        .alert-success { background: #e6f4ea; color: #137333; }
        .alert-error { background: #fce8e6; color: #c5221f; }
    </style>
</head>
<body>

<div class="admin-container">
    <div class="form-card">
        <div class="card-header">
            <h3><i class="fa-solid fa-gauge-high"></i> Publish Community News</h3>
            <p>Fill out the fields below to push a live card update onto the public news layout.</p>
        </div>

        <?php if(isset($_GET['success'])): ?>
            <div class="alert alert-success"><i class="fa-solid fa-circle-check"></i> News article published successfully!</div>
        <?php elseif(isset($_GET['error'])): ?>
            <div class="alert alert-error"><i class="fa-solid fa-circle-exclamation"></i> <?php echo htmlspecialchars($_GET['error']); ?></div>
        <?php endif; ?>

        <form action="process-news.php" method="POST" enctype="multipart/form-data">
            <div class="input-group">
                <label><i class="fa-solid fa-heading"></i> Article Title</label>
                <input type="text" name="title" placeholder="e.g., Ramadan 2026 Timetable Update" required>
            </div>

            <div class="input-group">
                <label><i class="fa-solid fa-layer-group"></i> News Category</label>
                <select name="category" required>
                    <option value="Announcements">Announcements</option>
                    <option value="Events">Events & Seminars</option>
                    <option value="Education">Education & Hifz</option>
                    <option value="Charity">Charity & Progress</option>
                </select>
            </div>

            <div class="input-group">
                <label><i class="fa-solid fa-image"></i> Thumbnail Cover Image</label>
                <input type="file" name="thumbnail" accept="image/*" required>
            </div>

            <div class="input-group">
                <label><i class="fa-solid fa-pen-nib"></i> Brief News Card Snippet</label>
                <input type="text" name="snippet" maxmaxlength="255" placeholder="A short 1-2 sentence preview to show on the main feed page..." required>
            </div>

            <div class="input-group">
                <label><i class="fa-solid fa-file-lines"></i> Full Article Body Content</label>
                <textarea name="content" rows="8" placeholder="Type out your full comprehensive news statement here..." required></textarea>
            </div>

            <button type="submit" class="submit-btn">
                <i class="fa-solid fa-paper-plane"></i> Push Live to News Page
            </button>
        </form>
    </div>
</div>

</body>
</html>