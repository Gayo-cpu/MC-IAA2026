<?php
// news.php
require_once '../ADMIN/feeds/db.php';

// Pull stories from newest to oldest
$query = $pdo->query("SELECT * FROM mciaa_news ORDER BY created_at DESC");
$articles = $query->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MCIAA - Community News Feed</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        /* ==========================================================================
           MCIAA UNIFIED CORE SYSTEM DESIGN TOKENS
           ========================================================================== */
        :root {
            --primary-green: #1e3d1a;
            --dark-green: #11240f;
            --accent-gold: #d4af37;
            --clean-white: #ffffff;
            --text-dark: #2b2b2b;
            --text-muted: #666666;
            --bg-light: #f8faf8;
        }

        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: var(--bg-light);
            color: var(--text-dark);
        }

        /* ==========================================================================
           CEILING-FIXED NAVIGATION STYLES
           ========================================================================== */
        .main-nav {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 75px !important;
            background-color: #ffffff !important;
            box-shadow: 0 4px 25px rgba(0, 0, 0, 0.08) !important;
            z-index: 9999 !important;
            box-sizing: border-box !important;
        }

        .main-nav .nav-container {
            width: 100% !important;
            max-width: 1280px !important;
            margin: 0 auto !important;
            height: 100% !important;
            padding: 0 35px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            box-sizing: border-box !important;
        }

        .main-nav .logo {
            text-decoration: none !important;
            font-weight: 700 !important;
            font-size: 1.35rem !important;
            color: #1e3d1a !important;
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
        }

        .main-nav .logo i,
        .main-nav .logo span {
            color: #d4af37 !important;
        }

        .nav-menu {
            display: flex !important;
            list-style: none !important;
            margin: 0 !important;
            padding: 0 !important;
            gap: 24px !important;
        }

        .nav-menu li a {
            text-decoration: none !important;
            color: #2b2b2b !important;
            font-size: 1.05rem !important;
            font-weight: 600 !important;
        }

        .nav-menu li a:hover {
            color: #1e3d1a !important;
        }

        /* ==========================================================================
           NEWS CONTENT CONTAINER GRID SECTION
           ========================================================================== */
        .news-wrapper {
            max-width: 1200px;
            margin: 140px auto 80px auto;
            /* 140px safe buffer clearance below top fixed bar */
            padding: 0 20px;
        }

        .page-header {
            text-align: center;
            margin-bottom: 50px;
        }

        .page-header h2 {
            font-size: 2.5rem;
            color: var(--primary-green);
            margin: 0 0 10px 0;
        }

        .page-header p {
            color: var(--text-muted);
            font-size: 1.1rem;
            margin: 0;
        }

        /* Responsive Grid Mechanism */
        .news-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
            gap: 30px;
        }

        /* News Cards Design Cards Framework */
        .news-card {
            background: var(--clean-white);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.03);
            border: 1px solid rgba(30, 61, 26, 0.04);
            display: flex;
            flex-direction: column;
            transition: all 0.3s ease;
        }

        .news-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 35px rgba(30, 61, 26, 0.08);
        }

        .card-image-box {
            position: relative;
            width: 100%;
            height: 210px;
            overflow: hidden;
            background-color: #eee;
        }

        .card-image-box img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
        }

        .news-card:hover .card-image-box img {
            transform: scale(1.05);
        }

        .category-pill {
            position: absolute;
            top: 15px;
            left: 15px;
            background-color: var(--primary-green);
            color: var(--accent-gold);
            font-size: 0.75rem;
            font-weight: 700;
            padding: 5px 12px;
            border-radius: 50px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .card-body {
            padding: 25px;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }

        .post-date {
            font-size: 0.82rem;
            color: var(--text-muted);
            margin-bottom: 10px;
            font-weight: 500;
        }

        .card-body h4 {
            font-size: 1.3rem;
            color: var(--primary-green);
            margin: 0 0 12px 0;
            line-height: 1.4;
        }

        .card-body p {
            font-size: 0.95rem;
            color: #555555;
            line-height: 1.6;
            margin: 0 0 20px 0;
            flex-grow: 1;
        }

        .read-more-btn {
            text-decoration: none;
            color: var(--primary-green);
            font-weight: 700;
            font-size: 0.92rem;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: color 0.2s ease;
        }

        .read-more-btn:hover {
            color: var(--accent-gold);
        }

        /* Empty State Blueprint Placement Components */
        .empty-state {
            grid-column: 1 / -1;
            text-align: center;
            padding: 80px 20px;
            background: var(--clean-white);
            border-radius: 20px;
            border: 1px dashed rgba(30, 61, 26, 0.15);
        }

        .empty-state i {
            font-size: 3.5rem;
            color: var(--accent-gold);
            margin-bottom: 15px;
        }

        .empty-state h3 {
            font-size: 1.6rem;
            color: var(--primary-green);
            margin: 0 0 8px 0;
        }

        @media(max-width: 1024px) {
            .nav-menu {
                display: none !important;
            }
        }
    </style>
</head>

<body>

    <nav class="main-nav" aria-label="Primary navigation">
        <div class="nav-container">
            <a href="../INDEX/index.html" class="logo" data-i18n="nav.brand" aria-label="Home">
                <i class="fas fa-moon"></i> MCIAA <span>Association</span>
            </a>
            <ul class="nav-menu">
                <li><a href="../INDEX/index.html" data-i18n="nav.home">Home</a></li>
                <li><a href="../ABOUT/about.html" data-i18n="nav.about">About Us</a></li>
                <li><a href="../HIFZ/hifz.html" data-i18n="nav.programs">Programs</a></li>
                <li><a href="../ASK_IMAM/ask_imam.html" data-i18n="nav.askImam">Ask Imam</a></li>
                <li><a href="news.php" data-i18n="nav.news">News</a></li>
                <li><a href="../DONATE/donate.html" data-i18n="nav.donate">Donate</a></li>
                <li><a href="../CONTACT/contact.html" data-i18n="nav.contact">Contact Us</a></li>
            </ul>
            <div class="nav-actions">
                <div class="nav-control-group">
                    <label for="languageSelect" class="sr-only">Language</label>
                    <select id="languageSelect" class="language-select" aria-label="Choose site language">
                        <option value="en">English</option>
                        <option value="sw">Kiswahili</option>
                        <option value="ar">العربية</option>
                    </select>
                    <button id="themeToggle" class="theme-toggle" aria-label="Toggle color theme">
                        <i class="fas fa-moon"></i>
                    </button>
                </div>
                <div class="nav-auth">
                    <a href="../LOGIN/login.html" class="login-link" data-i18n="nav.login">Login</a>
                    <a href="../REGISTER/register.html" class="cta-btn" data-i18n="nav.join">Join Us</a>
                </div>
            </div>
        </div>
    </nav>

    <div class="news-wrapper">
        <div class="page-header">
            <h2>Community News & Announcements</h2>
            <p>Stay up to date with the recent developments, schedules, and events inside the MCIAA network.</p>
        </div>

        <div class="news-grid">
            <?php if (count($articles) > 0): ?>
                <?php foreach ($articles as $story): ?>
                    <article class="news-card">
                        <div class="card-image-box">
                            <span class="category-pill"><?php echo htmlspecialchars($story['category']); ?></span>
                            <img src="../uploads/news/<?php echo basename($story['image_path']); ?>" alt="News Thumbnail">
                        </div>
                        <div class="card-body">
                            <div class="post-date">
                                <i class="fa-regular fa-calendar"></i>
                                <?php echo date('M d, Y', strtotime($story['created_at'])); ?>
                            </div>
                            <h4><?php echo htmlspecialchars($story['title']); ?></h4>
                            <p><?php echo htmlspecialchars($story['snippet']); ?></p>
                            <a href="#" class="read-more-btn">Read Full Story <i class="fa-solid fa-arrow-right-long"></i></a>
                        </div>
                    </article>
                <?php endforeach; ?>
            <?php else: ?>
                <div class="empty-state">
                    <i class="fa-solid fa-newspaper"></i>
                    <h3>No Recent Updates Found</h3>
                    <p>We are currently prepping some new announcements. Check back soon or visit our office updates!</p>
                </div>
            <?php endif; ?>
        </div>
    </div>

</body>

</html>