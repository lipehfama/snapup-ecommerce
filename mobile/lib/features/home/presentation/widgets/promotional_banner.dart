import 'package:flutter/material.dart';

class PromotionalBanner extends StatelessWidget {
  const PromotionalBanner({super.key});

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(12),
      child: AspectRatio(
        aspectRatio: 16 / 7,
        child: Image.asset(
          'assets/images/slider_img_1.jpg',
          width: double.infinity,
          fit: BoxFit.cover,
        ),
      ),
    );
  }
}
