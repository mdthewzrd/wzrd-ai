# inflnce.io Site Testing & Quality Assurance PRD

## Overview
Comprehensive testing and quality assurance checklist to ensure all functionality works correctly across the entire inflnce.io platform.

## 1. Header/Navigation Testing
### Logo
- [ ] Logo displays "inflnce.io" with lowercase 'i'
- [ ] Logo links to homepage
- [ ] Logo is properly positioned and sized

### Navigation Menu
- [ ] "Social Media" dropdown shows all platforms
- [ ] "Publications" link works
- [ ] "Tools" link works
- [ ] Search functionality works
- [ ] Profile dropdown works (when logged in)

## 2. Homepage Testing
### Hero Section
- [ ] Floating icons are properly positioned around content (not stacked on left)
- [ ] Floating icons are not behind text
- [ ] Icons include: Instagram, YouTube, TikTok, Twitter/X, Spotify
- [ ] Text shows "inflnce.io" correctly
- [ ] "Get Started" button links to /sign-up
- [ ] "Learn More" button links to /services

### Services Section
- [ ] "Explore Social Media" link works → /services/social-media
- [ ] "Explore Publications" link works → /services/publications  
- [ ] "Explore Tools" link works → /services/tools

### CTA Section
- [ ] "Get Started" button links to /sign-up
- [ ] "Learn More" button links to /services

## 3. Social Media Platform Pages Testing
### Platform Navigation Bar
- [ ] Instagram page has platform nav with all 5 platforms
- [ ] YouTube page has platform nav with all 5 platforms
- [ ] TikTok page has platform nav with all 5 platforms
- [ ] Twitter page has platform nav with all 5 platforms
- [ ] Spotify page has platform nav with all 5 platforms
- [ ] All platform nav buttons link correctly

### Platform-Specific Styling
- [ ] Instagram: Purple-to-pink gradients on features and selectors
- [ ] YouTube: Red icons and accents (NOT green)
- [ ] TikTok: Cyan-to-pink gradients
- [ ] Twitter: Blue color scheme
- [ ] Spotify: Green color scheme

### Functionality
- [ ] Service selection works on each platform
- [ ] Package selection shows details
- [ ] "Select Package" buttons work (show pricing/contact info)

## 4. Publications Testing
### Main Publications Page
- [ ] "PR & Press Publications" vs "Specialty Placements" tabs work
- [ ] Publications table loads and displays correctly
- [ ] Search functionality works
- [ ] Price filter works
- [ ] Genre filters work
- [ ] "Buy Now" buttons work

### Specialty Publications Page
- [ ] Accessible via /services/publications/specialty
- [ ] Shows 4 main categories: TV, Digital, Podcast, Social Media
- [ ] Card layout matches social media pages
- [ ] "Explore X Options" buttons work
- [ ] Navigation between PR and Specialty works

## 5. Tools Page Testing
### Tool Cards
- [ ] "Explore Automation" button works → /services/tools/automation
- [ ] "Explore Web Development" button works → /services/tools/web-development  
- [ ] "Explore SEO" button works → /services/tools/seo
- [ ] "Explore Knowledge Panel" button works → /services/tools/knowledge-panel
- [ ] "Contact Us" button works → contact form/page

## 6. Individual Tool Pages (Create if missing)
- [ ] /services/tools/automation - functional page
- [ ] /services/tools/web-development - functional page
- [ ] /services/tools/seo - functional page  
- [ ] /services/tools/knowledge-panel - functional page

## 7. Orders Dashboard Testing
- [ ] Dashboard loads with sample data
- [ ] Search functionality works
- [ ] Status filters work
- [ ] Platform filters work
- [ ] Sort functionality works

## 8. User Authentication Flow
- [ ] Sign up page works
- [ ] Sign in page works  
- [ ] Protected routes redirect properly
- [ ] User can access dashboard after login

## 9. Footer Testing
- [ ] All footer links work
- [ ] Social media icons link correctly
- [ ] Legal pages load properly

## 10. Responsive Design Testing
- [ ] Homepage responsive on mobile/tablet
- [ ] Social media pages responsive
- [ ] Publications table responsive
- [ ] Tools page responsive
- [ ] Navigation menu responsive

## 11. Performance Testing
- [ ] Pages load quickly
- [ ] Images optimized and load properly
- [ ] No JavaScript errors in console
- [ ] Smooth scrolling works

## Priority Issues to Fix Immediately

### Critical Issues
1. **Logo**: Change "Inflnce" to "inflnce.io" with lowercase 'i'
2. **Floating Icons**: Reposition around hero content, not stacked on left
3. **YouTube Icons**: Change green icons to red to match YouTube branding
4. **Spotify Platform Nav**: Add platform navigation bar like other social pages
5. **Tool Page Buttons**: Ensure all tool buttons link to functional pages
6. **Homepage Buttons**: Ensure "Get Started" and "Learn More" work

### Medium Priority
1. **Create missing tool pages** if they don't exist
2. **Publications specialty section** - ensure it's working as requested
3. **Social media service selectors** - ensure package selection works
4. **Search functionality** across the site

### Low Priority  
1. **Performance optimizations**
2. **Additional responsive improvements**
3. **Enhanced error handling**

## Testing Checklist Completion
- [ ] All critical issues resolved
- [ ] All medium priority issues addressed  
- [ ] Low priority improvements made where possible
- [ ] Full site regression testing completed
- [ ] User acceptance testing passed

---

**Testing Notes:**
- Test with both authenticated and non-authenticated users
- Verify all external links open in new tabs
- Check that all internal navigation maintains user state
- Ensure all forms have proper validation
- Verify that the site works across different browsers