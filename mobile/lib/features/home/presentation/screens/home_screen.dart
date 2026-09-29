import 'package:flutter/material.dart';

import 'package:snapup_mobile/core/theme/app_colors.dart';
import 'package:snapup_mobile/features/home/presentation/widgets/promotional_banner.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'SnapUp.',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        actions: [
          IconButton(
            onPressed: () {},
            icon: const Icon(Icons.shopping_cart_outlined),
          ),
        ],
      ),

      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            // Search
            TextField(
              decoration: InputDecoration(
                hintText: 'Search your items...',
                prefixIcon: const Icon(Icons.search),
                filled: true,
                fillColor: AppColors.surface,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                  borderSide: BorderSide.none,
                ),
              ),
            ),

            const SizedBox(height: 20),

            // Categories
            SizedBox(
              height: 40,
              child: ListView(
                scrollDirection: Axis.horizontal,
                children: const [
                  _CategoryItem(label: 'Beauty'),
                  _CategoryItem(label: 'Fragrances'),
                  _CategoryItem(label: 'Furniture'),
                  _CategoryItem(label: 'Groceries'),
                ],
              ),
            ),

            const SizedBox(height: 24),

            // Promotional banner
            const PromotionalBanner(),

            const SizedBox(height: 28),

            // Products section
            const Text(
              'ALL OUR PRODUCTS',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: AppColors.textPrimary,
              ),
            ),

            const SizedBox(height: 8),

            Align(
              alignment: Alignment.centerLeft,
              child: Container(width: 40, height: 3, color: AppColors.primary),
            ),

            const SizedBox(height: 20),

            // Product grid will be added next.
          ],
        ),
      ),
    );
  }
}

class _CategoryItem extends StatelessWidget {
  final String label;

  const _CategoryItem({required this.label});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: Chip(label: Text(label), backgroundColor: AppColors.surface),
    );
  }
}
